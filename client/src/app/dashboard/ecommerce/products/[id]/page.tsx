import PageHeading from "@/components/dashboard/common/PageHeading";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/envVariable";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const res = await fetch(BASE_URL + "/api/ecommerce/products/" + id);
  const { data: product } = await res.json();

  return (
    <div>
      <PageHeading
        pageTitle="Product details"
        breadcrumbList={[
          { name: "E-commerce", href: "" },
          { name: "Products", href: `/ecommerce/products` },
          { name: product.name, href: `/ecommerce/products/${product.slug}` },
        ]}
      >
        <Link href="/dashboard/ecommerce/products">
          <Button variant="blue">
            <span>See Product</span>
          </Button>
        </Link>
      </PageHeading>
      <div className="grid grid-cols-2 gap-10 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {product.images.map((image: string, index: number) => (
            <Image
              key={index}
              src={image}
              width={400}
              height={400}
              className="h-[300px] md:h-[400px] object-cover rounded-lg"
              alt="feature_image"
            />
          ))}
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-semibold">{product.title}</h1>
            <p className="text-gray-600 mt-2 ml-1">{product.category}</p>
          </div>
          <hr className="my-8" />
          <div>
            <div className="flex items-center gap-2 ">
              <p className="font-semibold text-3xl">${product.salePrice}</p>
              <div className="flex gap-2">
                <p className="line-through text-gray-500 text-xl">
                  ${Number(product.regularPrice)}.00
                </p>
                <span className="text-red-500">
                  {" "}
                  (
                  {((product.regularPrice - product.salePrice) /
                    product.regularPrice) *
                    100}
                  {"% "}
                  OFF)
                </span>
              </div>
            </div>
            <p className="text-green-700 text-sm mt-2">
              Inclusive of all taxes
            </p>
            <p className="mt-2">
              <span className="font-medium text-gray-600">Stock:</span>{" "}
              <span className="text-green-500 text-sm">
                {product.stockStatus}
              </span>
            </p>
          </div>
          <div className="mt-8">
            <h5 className="text-xl font-medium ">Products Description</h5>
            <hr className="my-4" />
            <div
              dangerouslySetInnerHTML={{ __html: product?.description }}
            ></div>
            <div className="flex items-center gap-2 mt-5">
              <div className="flex items-center gap-1">
                <Icon icon="cil:tags" width="25" height="25" />
                <span>Tags: </span>
              </div>
              <div className="space-x-2">
                {product?.tags.map((tag: string, index: number) => (
                  <Button key={index} variant="secondary">
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
