const Item = ({id, note, date, time, edit, isDone, submittingStatus}) => {

  function delItem() {
    submittingStatus.current = true;
    edit(function(prevData) {
      return prevData.filter(item => item.id !== id)
    })
  }

  function completeItem() {
    submittingStatus.current = true;
    isDone = !isDone;
    edit(function(prevData) {
      return prevData.map(item => ({
        ...item,
        isDone: item.id === id ? isDone : item.isDone
      }));
    })
  }

  return (
    <div className="item">
      <div>
        <p className={isDone ? 'complete' : ''}>{note}</p>
        <p>{`${date} ${time}`}</p>
      </div>
      <div>
        <button className="done" onClick={completeItem}>
          {isDone ? 'Undone' : 'Done'}
          </button>
        <button className="remove" onClick={delItem}>Del</button>
      </div>
    </div>
  );
};

export default Item;

