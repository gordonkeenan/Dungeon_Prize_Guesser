export const Mode = ({ mode, setMode, selectedMode }) => {
  return (
    <button
      onClick={() => setMode(mode)}
      className={
        mode.id === selectedMode.id
          ? "card-body card mode active"
          : "card-body card mode"
      }
    >
      <h5 className="card-title">
        {mode.name}
        <img className="mode" src={`/${mode.icon}`} alt={mode.name} />
        {/* <img
          className={mode.complete ? "medal" : "medal incomplete"}
          src="bombos.png"
          alt={mode.name}
        /> */}
      </h5>
      <p className="card-text">{mode.text}</p>
    </button>
  );
};
