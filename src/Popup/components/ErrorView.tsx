import { VscCopilotError } from "react-icons/vsc";

type Props = {
  onRetry: () => void;
};

export default function ErrorView({ onRetry }: Props) {
  return (
    <div className="card">
      <div className="cont_loader">
        <VscCopilotError style={{width: "45px", height: "45px", color: "red"}} />
      </div>
      <p style={{fontWeight: "bold", fontSize: "1rem", textAlign: "center"}}>Something went wrong</p>
      <p style={{color: "gray", marginTop: "-10px", marginBottom: "1.5rem", textAlign: "center"}}>Please try again. Our AI is currently taking a small break
         or hit a snag in the processing
      </p>
      <button className="button" onClick={onRetry}>
        Retry
      </button>
      <div style={{backgroundColor: "rgba(250, 234, 234, 0.4)", textAlign: "left", padding: "0.5rem", marginTop: "1.2rem"}}>
        <h3 style={{fontWeight: "bold", color: "red"}}>NETWORK STATUS</h3>
        <p style={{color: "gray", marginTop: "-10px"}}>check your internet connection if the problem persists</p>
      </div>
    </div>
  );
}