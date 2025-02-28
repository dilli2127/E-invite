import React, { useEffect, useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import "./e-album.css";

GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

const pdfUrl = "https://freshfocuzstudio.s3.ap-south-1.amazonaws.com/dhinraj-pdf_compressed.pdf";

const EAlbum: React.FC = () => {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const albumRef = useRef<HTMLDivElement>(null);

  const loadPdf = async () => {
    setLoading(true);
    try {
      const pdf = await getDocument(pdfUrl).promise;
      const loadPage = async (pageNumber: number) => {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1.5 }); // Adjusted scale for performance

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext("2d");
        if (context) {
          await page.render({ canvasContext: context, viewport }).promise;
          return canvas.toDataURL("image/png");
        }
        return null;
      };

      // Load all pages in parallel
      const pagesPromises = Array.from({ length: pdf.numPages }, (_, i) => loadPage(i + 1));
      const images = await Promise.all(pagesPromises);
      setPages(images.filter((img): img is string => img !== null)); // Filter out any null pages
    } catch (error) {
      console.error("Error loading PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPdf();
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      e.preventDefault();
      setIsSpacePressed(true);
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      setIsSpacePressed(false);
      setIsDragging(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 1));
    setDragOffset({ x: 0, y: 0 });
  };

  const handleFullScreen = () => document.documentElement.requestFullscreen();

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1 && isSpacePressed) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom > 1 && e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX - dragOffset.x, y: touch.clientY - dragOffset.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setDragOffset({ x: touch.clientX - dragStart.x, y: touch.clientY - dragStart.y });
  };

  const handleTouchEnd = () => setIsDragging(false);

  return (
    <div className="album-wrapper">
      <div className="album-header">
        <button onClick={handleZoomOut}>➖ Zoom Out</button>
        <button onClick={handleZoomIn}>➕ Zoom In</button>
        <button onClick={handleFullScreen}>⛶ Fullscreen</button>
      </div>

      <div
        className="flipbook-container"
        ref={albumRef}
        style={{
          transform: `scale(${zoom}) translate(${dragOffset.x}px, ${dragOffset.y}px)`,
          transition: isDragging ? "none" : "transform 0.1s ease-out",
          cursor: zoom > 1 && isSpacePressed ? "grab" : "default",
          touchAction: "none",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {loading ? (
          <div className="loading">Loading Album...</div>
        ) : (
          <HTMLFlipBook
            width={600}
            height={400}
            size="stretch"
            minWidth={300}
            maxWidth={1200}
            minHeight={200}
            maxHeight={600}
            showCover={true}
            className="album-flipbook"
            style={{}}
            startPage={0}
            drawShadow={true}
            flippingTime={1000}
            useMouseEvents={true}
            clickEventForward={true}
            usePortrait={true}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={0.5}
            showPageCorners={true}
            disableFlipByClick={zoom > 1}
            swipeDistance={zoom > 1 ? 9999 : 30}
            mobileScrollSupport={zoom === 1}
          >
            {pages.map((page, index) => (
              <div key={index} className="album-page">
                <img src={page} alt={`Page ${index + 1}`} className="album-image" />
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </div>
    </div>
  );
};

export default EAlbum;
