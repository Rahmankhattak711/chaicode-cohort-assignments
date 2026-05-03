import React, { useEffect } from "react";

export default function FetchProduct() {
  const [productData, setProductData] = React.useState<any>();

  const fetchProductData = async () => {
    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/randomproducts",
      );

      if (response.ok) {
        console.log("product fetching successful");
      }

      const data = await response.json();
      setProductData(data.data.data[0]);
    } catch (error) {
      console.error("product fetching error", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);
  return (
    <div>
      {productData && (
        <div>
          <h1>{productData.title}</h1>
          <p>{productData.description}</p>
          <p>{productData.price}</p>
        </div>
      )}
    </div>
  );
}
