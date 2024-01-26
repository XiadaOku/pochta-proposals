import AchievementProgressBarStop from "./achievementProgressBarStop";

export default function AchievementProgressBar({ current, max }: { current: number, max: number }) {
  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "1.75rem",
      background: "linear-gradient(340.48deg, rgba(186, 214, 177, 0.2) 9.32%, rgba(186, 214, 177, 0.2) 83.24%)",
      borderRadius: "1.5rem",
      padding: "0.125rem"
    }}>
      <div style={{        
        background: 'linear-gradient(269.84deg, rgba(115, 174, 98, 1) 2.96%, rgba(186, 214, 177, 1) 96.87%)',
        width: `${current / max * 100}%`,
        height: "100%",
        borderRadius: "1.5rem",
      }}></div>
      <div style={{
        position: "absolute",
        top: "0.125rem",
        width: current / max <= 0.1 ? "30%" : current / max <= 0.5 ? `${current / max * 100 + 15}%` : `${current / max * 100 - (current == max ? 0 : 5)}%`,
        lineHeight: "1.5rem",
        color: "#BAD6B1",
        textAlign: (current == max) ? "center" : "end"
      }}>{`${current}/${max}`}</div>
      <AchievementProgressBarStop value={current} style={{ left: "0.125rem", top: "0.125rem" }}/>
      <AchievementProgressBarStop value={max} style={{ right: "0.125rem", bottom: "0.125rem", opacity: "50%" }}/>
    </div>
  )
}