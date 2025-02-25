import React, { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

// PDF URL
const pdfUrl =
  "https://freshfocuzstudio.s3.ap-south-1.amazonaws.com/harish-reception.pdf";

// PDF.js Worker
GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
const EAlbum: React.FC = () => {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdf = await getDocument(pdfUrl).promise;
        const totalPages = pdf.numPages;

        // Render pages in parallel
        const pageImages = await Promise.all(
          Array.from({ length: totalPages }, async (_, i) => {
            const page = await pdf.getPage(i + 1);
            const viewport = page.getViewport({ scale: 2 });

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            if (context) {
              canvas.height = viewport.height;
              canvas.width = viewport.width;

              await page.render({
                canvasContext: context,
                viewport: viewport,
              }).promise;

              return canvas.toDataURL("image/png");
            }
            return "";
          })
        );

        setPages(pageImages.filter(Boolean));
        setLoading(false);
      } catch (error) {
        console.error("Error loading PDF:", error);
        setLoading(false);
      }
    };

    loadPdf();
  }, []);

  return (
    <div
      style={{
        width: "1200px",
        height: "600px",
        margin: "auto",
        padding: "20px",
      }}
    >
      {loading ? (
        <div>Loading PDF...</div>
      ) : pages.length > 0 ? (
        <HTMLFlipBook
          width={1200}
          height={600}
          size="stretch"
          minWidth={400}
          maxWidth={1200}
          minHeight={300}
          maxHeight={900}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          swipeDistance={30}
          className="album-container"
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            overflow: "hidden",
          }}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          useMouseEvents={true}
          clickEventForward={true}
          usePortrait={true}
          startZIndex={10}
          autoSize={true}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {pages.map((page, index) => (
            <div key={index} className="album-page">
              <img
                src={page}
                alt={`Page ${index + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          ))}
        </HTMLFlipBook>
      ) : (
        <div>No pages found</div>
      )}
    </div>
  );
};

export default EAlbum;
