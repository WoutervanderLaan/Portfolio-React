import TableItem from "../table-item/table-item.component";

import "./table-category.styles.scss";

const organizeItemsChronologically = (items) => {
  if (!items) return;
  return items.sort((a, b) => {
    return b.startDate - a.startDate;
  });
};

const TableCategory = ({ category, items, compose }) => {
  const orderedItems = organizeItemsChronologically(items);
  return (
    <>
      <p>{`${category}:`}</p>
      <table>
        <tbody>
          {orderedItems.map((item, index) => {
            return <TableItem key={index} item={item} compose={compose} />;
          })}
        </tbody>
      </table>
      <br />
    </>
  );
};

export default TableCategory;
