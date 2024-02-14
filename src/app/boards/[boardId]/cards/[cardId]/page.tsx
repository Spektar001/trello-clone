import BoardPage from "../../page";

type CardPageProps = {
  params: {
    cardId: string;
    boardId: string;
  };
};

const CardPage = ({ params }: CardPageProps) => {
  return (
    <div>
      <BoardPage params={params} />
    </div>
  );
};

export default CardPage;
