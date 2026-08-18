import { getResourcesByQueryWithVisible } from "@/actions/resources";
import { getResourcesCategories } from "@/actions/resourcesCategory";
import FadeInSection from "@/components/common/FadeInSection";
import { ShopPagination } from "@/components/shop/ShopPagination";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/authLib";
import { BlogCategoryType } from "@/types/BlogCategory";
import { ResourcesType } from "@/types/Resources";
import { getImageUrl } from "@/utils/getImageUrl";
import { queryFormatter } from "@/utils/queryFormatter";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

// const categoriess = [
//   "All Categories",
//   "Child Safety",
//   "Abuse & Trauma Support",
//   "Marriage & Family",
//   "Women's Health & Guidance",
//   "Other Support",
// ];
// const resourcess = [
//   {
//     id: 1,
//     title: "Ani Ledodi Helpline",
//     description:
//       "Anonymous guidance and support for women navigating intimate and personal questions.",
//     buttonText: "Ani Ledodi Helpline",
//     type: "organization",
//     image: "/images/resources/ani.png",
//   },
//   {
//     id: 2,
//     title: "Tahareinu",
//     description:
//       "Education, medical guidance, and resources related to tahara and reproductive health.",
//     buttonText: "Tahareinu",
//     type: "organization",
//     image: "/images/resources/tahareinku.png",
//   },
//   {
//     id: 3,
//     title: "The Comfort Zone",
//     description:
//       "Support, community, and hope for women seeking connection, encouragement, and growth.",
//     buttonText: "The Comfort Zone",
//     type: "organization",
//     image: "/images/resources/ani.png",
//   },
//   {
//     id: 4,
//     title: "Religious Resource",
//     description:
//       "A comprehensive halachic kuntres on the mitzvah of Niddah, including source material and responsa. Available only to approved rabbanim, dayanim, and chosson teachers.",
//     buttonText: "Request Access",
//     type: "resource",
//     image: "/images/resources/ani.png",
//   },
//   {
//     id: 5,
//     title: "Child Safety",
//     description:
//       "Agencies and organizations dedicated to protecting children and supporting families.",
//     buttonText: "View All",
//     type: "category",
//     image: "/images/resources/ani.png",
//   },
//   {
//     id: 6,
//     title: "Abuse & Trauma Support",
//     description:
//       "Resources for individuals and families experiencing abuse, trauma, and crisis.",
//     buttonText: "View All",
//     type: "category",
//     image: "/images/resources/ani.png",
//   },
//   {
//     id: 7,
//     title: "Marriage & Family Support",
//     description:
//       "Organizations that strengthen marriage, family relationships, and communication.",
//     buttonText: "View All",
//     image: "/images/resources/ani.png",
//     type: "category",
//   },
// ];
export default async function Resources({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await getSession();
  if(!user) {
    return redirect("/login")
  }
  const q = await searchParams;
  const query = await queryFormatter(searchParams);
  const [resources, categories] = await Promise.all([
    getResourcesByQueryWithVisible(query),
    getResourcesCategories(),
  ]);
  return (
    <main>
      {/* <section className="bg-[linear-gradient(rgba(0,120,200,0.4),rgba(0,120,200,0.4)),url('/images/volunteer/backlit-bird-clouds-755385.png')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black/15 min-h-100">
        <div className="container h-full">
          <div className="pt-10 max-w-155 z-1 relative before:bg-orange-light before:absolute before:top-0 before:-left-40 before:-z-1 before:w-full sm:before:w-200  before:h-80 before:blur-[150px] ">
            <div className="w-fit">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl   text-purple-cs font-bold ">
                RESOURCES
              </h1>
              <div className="border-b-2 border-purple-cs/20 my-4 relative w-full">
                <span className="text-4xl text-purple-cs/20 absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-light rounded-full px-1 py-0.5 inline-block w-fit h-fit">
                  <Icon icon="mdi:heart" className="size-7 " />
                </span>
              </div>
            </div>
            <p className="text-xl text-gray-700 mt-6 font-lora">
              Trusted organizations and support services for the Jewish
              community.
            </p>
            <p className="text-xl text-gray-700 mt-2 font-lora">
              A directory of agencies and organizations that provide specialized
              support and services.
            </p>
          </div>
        </div>
      </section> */}

      <section className="bg-[linear-gradient(rgba(0,120,200,0.4),rgba(0,120,200,0.4)),url('/images/volunteer/backlit-bird-clouds-755385.png')] bg-cover bg-center h-[200px] w-full grid place-items-center">
        <FadeInSection
          initial={{ opacity: 0, y: -50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: -50 }}
          margin="40px 0px -40px 0px"
        >
          <h1 className="text-white font-extrabold text-3xl lg:text-4xl text-center">
            Resources
          </h1>
        </FadeInSection>
      </section>
      <section className="container py-10">
        <div className="flex gap-2 md:gap-10 flex-wrap">
          <Link href={`/resources`}>
            <Button
              variant="outline"
              className={`transform transition duration-300 ${!q.category ? "text-white bg-purple-cs" : "bg-white text-purple-cs"} hover:bg-purple-cs hover:text-white capitalize`}
            >
              All
            </Button>
          </Link>
          {categories?.data.map((category: BlogCategoryType) => (
            <Link
              href={`/resources?category=${category.slug}`}
              key={category._id}
            >
              <Button
                variant="outline"
                className={`transform transition duration-300 ${q.category === category.slug ? "text-white bg-purple-cs" : "bg-white text-purple-cs"} hover:bg-purple-cs hover:text-white capitalize`}
              >
                {category.name}
              </Button>
            </Link>
          ))}
        </div>
        <div>
          <Link
            href="/resources?limit=100"
            className="text-purple-cs mt-4 hover:underline flex items-center gap-1 justify-end w-full"
          >
            View All
            <Icon
              icon="material-symbols:arrow-right-alt"
              width={20}
              height={20}
              className="mr-2"
            />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          {resources?.data.map((resource: ResourcesType) => (
            <div
              key={resource._id}
              className="bg-white rounded-lg shadow-[1px_1px_4px] shadow-black/20 overflow-hidden flex flex-col justify-between items-center"
            >
              <Image
                src={getImageUrl(resource.thumbnail, "resources")}
                alt={resource.title}
                width={200}
                height={200}
                className="h-25 object-contain"
              />
              <div className="p-4 flex-1 flex flex-col text-center">
                <h2 className="text-xl font-semibold mb-2 capitalize">
                  {resource.title}
                </h2>
                <p className="text-gray-600 mb-4 flex-1 font-lora">
                  {resource.description}
                </p>
                <a
                  href={resource.link}
                  target="_blank"
                  className="block w-full"
                >
                  <Button
                    variant="outline"
                    className={`mt-auto flex w-full font-montserrat font-semibold text-purple-cs  hover:bg-purple-cs hover:text-white transform transition duration-300 `}
                  >
                    Visit
                    <Icon
                      icon="material-symbols:arrow-right-alt-rounded"
                      className="mr-2 "
                    />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="w-fit ml-auto py-8">
          <ShopPagination pagination={resources.pagination} />
        </div>
      </section>
    </main>
  );
}
