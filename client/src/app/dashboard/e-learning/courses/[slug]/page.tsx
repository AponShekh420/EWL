import PageHeading from "@/components/dashboard/common/PageHeading";
import { Button } from "@/components/ui/button";
import { productsData } from "@/constants/products";
import { ProductType } from "@/types/Product";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const product = productsData.find(
    (item) => item.slug === slug
  ) as ProductType;

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
          {product.images.map((image, index) => (
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
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <p className="text-gray-600 mt-2 ml-1">{product.category}</p>
          </div>
          <hr className="my-8" />
          <div>
            <div className="flex items-center gap-2 ">
              <p className="font-semibold text-3xl">${product.price}</p>
              <div className="flex gap-2">
                <p className="line-through text-gray-500 text-xl">
                  ${Number(product.price) + 20}.00
                </p>
                <span className="text-red-500">(7.81% OFF)</span>
              </div>
            </div>
            <p className="text-green-700 text-sm mt-2">
              Inclusive of all taxes
            </p>
            <p className="mt-2">
              <span className="font-medium text-gray-600">Stock:</span>{" "}
              <span className="text-green-500 text-sm">
                {Number(product.stock) > 0 ? "Available" : ""}
              </span>
            </p>
          </div>
          <div className="mt-8">
            <h5 className="text-xl font-medium ">Products Description</h5>
            <hr className="my-4" />
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                alias praesentium voluptatem nemo maxime dicta consequuntur hic
                fugit exercitationem assumenda, repellendus, incidunt, sint
                neque tempora iusto. Aut vitae recusandae ipsa numquam enim sunt
                distinctio quam deleniti provident maiores voluptatum placeat
                asperiores, ullam vel praesentium omnis? Earum provident dolorem
                dicta veniam.
              </p>
              <div className=" mt-5">
                <h5 className="font-semibold">Features</h5>
                <ul className="list-disc ml-8 mt-1.5 ">
                  <li>Lorem ipsum dolor sit amet.</li>
                  <li>Lorem ipsum dolor sit amet.</li>
                  <li>Lorem ipsum dolor sit amet.</li>
                  <li>Lorem ipsum dolor sit amet.</li>
                  <li>Lorem ipsum dolor sit amet.</li>
                </ul>
              </div>

              <p className="mt-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                labore, cupiditate, ipsum esse doloribus asperiores, aliquam
                obcaecati odit eum tenetur aliquid eius? Ducimus fugiat porro
                nobis facilis nihil fugit nulla sint laboriosam ipsam aliquid
                quae earum aperiam possimus adipisci qui cupiditate explicabo
                tempora eos quod quas, dignissimos rerum assumenda odit.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <div className="flex items-center gap-1">
                <Icon icon="cil:tags" width="25" height="25" />
                <span>Tags: </span>
              </div>
              <div className="space-x-2">
                <Button variant="secondary">Shoes</Button>
                <Button variant="secondary">Fashion</Button>
                <Button variant="secondary">Men</Button>
                <Button variant="secondary">Nike</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
