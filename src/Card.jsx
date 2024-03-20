import "./Card.css";

const Card = ({ children, className = "", title, extra, loading = false }) => {
  return (
    <div className={`${className} card`}>
      <div className="head">
        <div className="title">{title}</div>
        {extra&&<>
            <div className="reload" onClick={extra.reload} />
            {/* {extra.custom} */}
        </>}
      </div>

      <div className="content">{children}</div>
      {loading && (
        <div className="mask">
          <div className="reload loading"></div>
        </div>
      )}
    </div>
  );
};

export default Card;
