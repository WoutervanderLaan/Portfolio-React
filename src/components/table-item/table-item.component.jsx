const TableItem = ({ item, compose }) => {
  return (
    <tr>
      {compose && (
        <td>
          <input type="checkbox" name={item.id} />
        </td>
      )}
      <td>{item.startDate}</td>
      {item.endDate > 0 ? <td>{item.endDate}</td> : <td></td>}
      <td className="table-name">{item.name}</td>
    </tr>
  );
};

export default TableItem;
