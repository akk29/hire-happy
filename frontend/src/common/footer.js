import Config from "../main/config";

const footer_index = (index, onclick, current) => {
  var limit = parseInt(Config.offset_size);
  var offset = (index - 1) * limit;
  var buttonClass = `btn btn-primary`;
  if (index === current) {
    buttonClass = `btn btn-success`;
  }
  return (
    // <select id="cars">
    //     <option value="volvo">Volvo</option>
    //     <option value="saab">Saab</option>
    //     <option value="opel">Opel</option>
    //     <option value="audi">Audi</option>
    // </select>

    <span key={index}>
      <button className={buttonClass} onClick={() => onclick(limit, offset)}>
        {index}
      </button>
      &nbsp;
    </span>
  );
};

export const Footer = (props) => {
  var total = props.total;
  var total_index = Math.ceil(total / parseInt(Config.offset_size));
  var html = [];
  //   var outer_html =
  for (let index = 1; index <= total_index; index++) {
    html.push(footer_index(index, props.action, props.current));
  }
  return <div>{html}</div>;
}
