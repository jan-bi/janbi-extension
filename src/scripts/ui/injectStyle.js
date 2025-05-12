export default function injectStyle() {
  const styleTag = document.createElement("style");
  styleTag.textContent = `
  .janbi-hover {
    outline: 2px dashed #2536D2 !important;
    cursor: crosshair !important;
  }

  .janbi-selected {
    outline: 2px solid rgba(61, 61, 60, 0.35) !important;
    background-color: rgba(255, 250, 200, 0.55) !important;
  }

  #janbi-selector-panel {
    position: fixed;
    top: 100px;
    right: 20px;
    width: 360px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    padding: 14px 20px;
    font-size: 14px;
    z-index: 999999;
    max-height: 60vh;
    overflow-y: auto;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    border-radius: 8px;
  }

  #janbi-selector-panel .janbi-title {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: bold;
    color: #2536D2;
  }

  #janbi-selector-panel .janbi-subtitle {
    margin: 8px 0 10px;
    font-size: 13px;
    color: #4b5563;
  }

  #janbi-selector-panel .janbi-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  #janbi-selector-panel li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    font-size: 13px;
    background: #fff;
    padding: 6px 10px;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    word-break: break-all;
  }

  #janbi-selector-panel button.remove {
    width: 3rem;
    margin-left: 12px;
    color: #ef4444;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
  }

  #janbi-selector-panel button.remove:hover {
    color: #dc2626;
  }
  `;

  document.head.appendChild(styleTag);
}
