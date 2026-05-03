export default function LoadingView() {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <div className="cont_loader">
        <div className="loader" />
      </div>
      <p style={{fontSize: "0.9rem" }}>Summarizing...</p>
      <p style={{color: "gray"}}>parsing page content and summarizing key insights for you</p>
    </div>
  );
}