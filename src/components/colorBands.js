export const FirstBand = (props) => {
  const colors = props.colors;

  return (
    <div style={{ marginLeft: "0px", position: "relative", zIndex: "54" }}>
      {colors
        .filter((color, index) => color.value > 0)
        .map((color, index) => (
          <div
            key={index}
            style={{
            
              border: "1px solid black",
              margin: "2px",
              width: "40px",
              height: "15px",
              background: ` ${color.color}`,
            }}
            onClick={() => {
              props.pickColor("first-band", "first-band-colors", color.color);
              props.handleChange("first", color.name, color.value);
            }}
          >
      
          </div>
        ))}
    </div>
  );
};

export const SecondBand = (props) => {
  const colors = props.colors;
  return (
    <div
      style={{
        marginLeft: "0px",
        position: "absolute",
        top: 0,
        zIndex: "51",
      }}
    >
      {colors
        .filter((color, index) => color.value >= 0)
        .map((color, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              margin: "2px",
              width: "40px",
              height: "15px",
              background: ` ${color.color}`,
            }}
            onClick={() => {
              props.pickColor("second-band", "second-band-colors", color.color);
              props.handleChange("second", color.name, color.value);
            }}
          ></div>
        ))}
    </div>
  );
};

export const ThirdBand = (props) => {
  const colors = props.colors;
  return (
    <div
      style={{
        marginLeft: "0px",
        position: "absolute",
        top: 0,
        zIndex: "52",
      }}
    >
      {colors
        .filter((color, index) => color.value >= 0)
        .map((color, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              margin: "2px",
              width: "40px",
              height: "15px",
              background: ` ${color.color}`,
            }}
            onClick={() => {
              props.pickColor("third-band", "third-band-colors", color.color);
              props.handleChange("third", color.name, color.value);
            }}
          ></div>
        ))}
    </div>
  );
};

export const MultiplierBand = (props) => {
  const colors = props.colors;
  return (
    <>
      <div
        style={{
          marginLeft: "0px",
          position: "absolute",
          top: 0,
          zIndex: "53",
        }}
      >
        {colors
          .filter(
            (color, index) => color.multiplier >= 0 || color.multiplier <= 0
          )
          .map((color, index) => (
            <div
              key={index}
              style={{
                border: "1px solid black",
                margin: "2px",
                width: "40px",
                height: "15px",
                background: ` ${color.color}`,
                zIndex: "100",
              }}
              onClick={() => {
                props.pickColor(
                  "multiplay-band",
                  "multiplay-band-colors",
                  color.color
                );
                props.handleChange("multiplier", color.name, color.multiplier);
              }}
            ></div>
          ))}
      </div>
    </>
  );
};

export const ToleranceBand = (props) => {
  const colors = props.colors;
  return (
    <div style={{ marginLeft: "0px", position: "", zIndex: "54" }}>
      {colors
        .filter((color, index) => color.tolerance >= 0)
        .map((color, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              margin: "2px",
              width: "40px",
              height: "15px",
              background: ` ${color.color}`,
            }}
            onClick={() => {
              props.pickColor(
                "tolerance-band",
                "tolerance-band-colors",
                color.color
              );
              props.handleChange("tolerance", color.name, color.tolerance);
            }}
          ></div>
        ))}
    </div>
  );
};
