const ListItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <li className="flex h-8 items-center text-sm" onClick={onClick && onClick}>
      {children}
    </li>
  );
};

const ListRoot = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className="px-4 py-3">
        <div className="text-md flex h-10 items-center">{title}</div>
        <ul className="flex flex-col gap-4"> {children} </ul>
      </div>
      <hr />
    </>
  );
};

export const List = Object.assign(ListRoot, { Item: ListItem });
