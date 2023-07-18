import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keyword }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To E_Bazzar",
  decription: "best quality at lowest price",
  keyword: "electronics,buy electronics,best electronics",
};
export default Meta;
