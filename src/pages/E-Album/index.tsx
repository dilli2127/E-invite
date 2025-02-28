import React, { useEffect, useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import "./e-album.css";

GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

const pdfUrl =
  "https://freshfocuzstudio.s3.ap-south-1.amazonaws.com/dhinraj-pdf_compressed.pdf";

const EAlbum: React.FC = () => {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const albumRef = useRef<HTMLDivElement>(null);

  // PDF Loading Function
  const loadPdf = async () => {
    setLoading(true);
    try {
      const pdf = await getDocument(pdfUrl).promise;
      const images: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext("2d");
        if (context) {
          await page.render({ canvasContext: context, viewport }).promise;
          images.push(canvas.toDataURL("image/png"));
        }
      }
      setPages(images);
    } catch (error) {
      console.error("Error loading PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPdf();
  }, []); // Run only once on mount

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") setIsSpacePressed(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsSpacePressed(false);
        setIsDragging(false); // Reset dragging on Space release
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Zoom & Fullscreen Handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 1));
    setDragOffset({ x: 0, y: 0 }); // Reset drag offset when zooming out
  };
  const handleFullScreen = () => document.documentElement.requestFullscreen();

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1 && isSpacePressed) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch (Pinch-to-Zoom) Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touchDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setLastTouchDistance(touchDistance);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDistance !== null) {
      const newDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const zoomFactor = newDistance / lastTouchDistance;
      setZoom((prev) => Math.max(1, Math.min(prev * zoomFactor, 2)));
      setLastTouchDistance(newDistance);
    }
  };

  const handleTouchEnd = () => setLastTouchDistance(null);

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
          transition: "transform 0.1s ease-out",
          cursor: zoom > 1 && isSpacePressed ? "grab" : "default",
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
            mobileScrollSupport={true}
            className="album-flipbook"
            style={{}}
            startPage={0}
            drawShadow={true}
            flippingTime={1000}
            useMouseEvents={true}
            clickEventForward={false}
            usePortrait={true}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={0.5}
            showPageCorners={true}
            disableFlipByClick={false}
            swipeDistance={30} // Add this line
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
