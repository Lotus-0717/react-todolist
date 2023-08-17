import Item from "./Item";
const List = ({ listData, edit, submittingStatus }) => {
  return (
    <div className="list">
      {listData.map((item) => {
        const { id, note, date, time, isDone } = item;
        return (
          <Item
            key={id}
            id={id}
            note={note}
            date={date}
            time={time}
            edit={edit}
            isDone={isDone}
            submittingStatus={submittingStatus}
          />
        );
      })}
    </div>
  );
};

export default List;
