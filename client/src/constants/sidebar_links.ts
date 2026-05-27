export const sidebar_links = [
  {
    id: 1,
    url: "/dashboard",
    name: "Dashboard",
    icon: "duo-icons:dashboard",
  },
  {
    id: 2,
    url: "",
    name: "E-Commerce",
    icon: "ph:shopping-cart-duotone",
    isDropdown: true,
    isShowDropdown: false,
    dropdownList: [
      { id: 101, name: "products", url: "/dashboard/ecommerce/products" },

      { id: 102, name: "categories", url: "/dashboard/ecommerce/categories" },
      { id: 103, name: "shipping", url: "/dashboard/ecommerce/shipping" },
      { id: 104, name: "USPS Configuration", url: "/dashboard/ecommerce/usps-configuration" },
      {
        id: 105,
        name: "reviews",
        url: "/dashboard/ecommerce/products/reviews",
      },
      { id: 106, name: "orders", url: "/dashboard/ecommerce/orders" },

      { id: 107, name: "shop", url: "/dashboard/ecommerce/shop" },
    ],
  },

  {
    id: 3,
    url: "",
    name: "E-Learning",
    icon: "fluent-mdl2:publish-course",
    isDropdown: true,
    isShowDropdown: false,
    dropdownList: [
      { id: 101, name: "Courses", url: "/dashboard/e-learning/courses" },
      { id: 102, name: "Classes", url: "/dashboard/e-learning/classes" },
      { id: 103, name: "Records", url: "/dashboard/e-learning/records" },
      { id: 104, name: "Orders", url: "/dashboard/e-learning/orders" },
      { id: 105, name: "Class Orders", url: "/dashboard/e-learning/class-orders" },
    ],
  },
  {
    id: 4,
    url: "",
    name: "Blog-Management",
    icon: "mdi:post-outline",
    isDropdown: true,
    isShowDropdown: false,
    dropdownList: [
      { id: 101, name: "Blog", url: "/dashboard/blog-management/blogs" },
      { id: 102, name: "Categories", url: "/dashboard/blog-management/categories" },
    ],
  },
  {
    id: 5,
    url: "",
    name: "Users",
    icon: "flowbite:users-outline",
    isDropdown: true,
    isShowDropdown: false,
    dropdownList: [{ id: 101, name: "User list", url: "/dashboard/users" }],
  },
  {
    id: 6,
    url: "",
    name: "Paid Hotline",
    icon: "raphael:speaker",
    isDropdown: true,
    isShowDropdown: false,
    dropdownList: [
      { id: 101, name: "Paid Speaker", url: "/dashboard/paid-hotline-speaker" },
    ],
  },
];
