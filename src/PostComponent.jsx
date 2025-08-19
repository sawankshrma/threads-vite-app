// Create a style object to apply styles to the div element in PostComponent
const style = {
  backgroundColor: "#181818",
  color: "white",
  borderWidth: "1px",
  borderRadius: "30px",
  borderTop: "solid #303030ff",
  borderBottom: "solid #303030ff",
  padding: 20,
  margin: "10px 0px",
};

export function PostComponent({ id, name, time, image, description }) {
  return (
    <div style={style} id={id}>
      <div style={{ display: "flex", width: "100%" }}>
        <img src={image} style={{}} />
        <div style={{ fontSize: 15, fontFamily: "monospace", marginLeft: 10 }}>
          <b>{name}</b>

          {time !== undefined ? (
            <div style={{ display: "flex" }}>
              <div>{time}</div>
              <img
                src="https://media.istockphoto.com/id/931336618/vector/clock-vector-icon-isolated.jpg?s=612x612&w=0&k=20&c=I8EBJl8i6olqcrhAtKko74ydFEVbfCQ6s5Pbsx6vfas="
                style={{ width: 15, height: 15 }}
              />
            </div>
          ) : null}
        </div>
      </div>

      <div style={{ fontSize: 14, marginTop: 5 }}>{description}</div>
    </div>
  );
}
