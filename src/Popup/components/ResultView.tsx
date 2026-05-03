import { LuNotebookPen } from "react-icons/lu";

type Props = {
  summary: string[];
  onReset: () => void;
};

export default function ResultView({ summary, onReset }: Props) {

  return (
    <div className="card result" style={{ maxHeight: 300, overflowY: "auto" }}>
      <p className="text-muted"><span style={{marginLeft: "-10px", color: "#2563eb"}}><LuNotebookPen /></span>Summary</p>

        <ul style={{ paddingLeft: 16, margin: 0 }}>
            {summary.map((point, index) => (
                <li key={index} style={{ marginBottom: 6, fontSize: "0.8rem" }}>
                    {point}
                </li>
            ))}
        </ul>


      <div style={{backgroundColor: "rgba(250, 234, 234, 0.4)", position: "sticky", inset: "auto, 0", padding: "1.2rem", }}>
        <button className="button">Copy Summary</button>
        <button
        className="button secondary"
        style={{ marginTop: 10 }}
        onClick={onReset}
        >
           Clear
        </button>
       </div>
    </div>
  );
}