import { FaFileAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { FaBoltLightning } from "react-icons/fa6";


type Props = {
  title: string;
  onSummarize: () => void;
};

export default function DefaultView({ title, onSummarize }: Props) {
  return (
    <div className="card">
      <p className="text-muted">Current Page Title</p>
      <p className="title">{title}</p>

      <div style={{backgroundColor: "rgba(250, 234, 234, 0.4)", borderRadius: "50%", padding: "1rem", width: "fit-content", marginLeft: "40%", marginBottom: "1.7rem"}}>
        <FaFileAlt style={{width: "40px", height: "40px", color: "#2563eb"}} />
      </div>

      <button className="button" onClick={onSummarize}>
        ✨ Summarize Page
      </button>

      <p className="text-muted" style={{ marginTop: 8, textAlign: "center" }}>
        Get a quick summary of this page
      </p>

      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginTop: "2rem"}}>
        <div style={{backgroundColor: "rgba(250, 234, 234, 0.4)", borderRadius: "10px", padding: "0.7rem", width: "50%" }}>
            <span style={{color: "#2563eb"}}><FaClock /></span>
            <p style={{marginTop: "-3px", fontSize: "1rem"}}>Fast</p>
        </div>
        <div style={{backgroundColor: "rgba(250, 234, 234, 0.4)", borderRadius: "10px", padding: "0.7rem", width: "50%" }}>
            <span style={{color: "#2563eb"}}><FaBoltLightning /></span>
            <p style={{marginTop: "-3px", fontSize: "1rem"}}>Accurate</p>
        </div>
      </div>
    </div>
  );
}