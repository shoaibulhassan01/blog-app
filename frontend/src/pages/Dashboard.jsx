import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import {
  FiMenu,
  FiFileText,
  FiFolder,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import { useBlogStore } from "../store/blogStore";

const Dashboard = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [userCategories, setUserCategories] = useState([]);

  const { user, isAuthenticated } = useAuthStore();
  const {
    fetchBlogs,
    allBlogs,
    fetchBlogsByUser,
    fetchCategories,
    categories,
    fetchCategoriesByUser,
  } = useBlogStore();

  if (!isAuthenticated) {
    return <div>Please log in to access the dashboard</div>;
  }

  useEffect(() => {
    if (isAuthenticated) {
      // Only fetch if authenticated
      const fetchData = async () => {
        await fetchBlogs(); // Ensure blogs are fetched first
        await fetchCategories(); // Ensure categories are fetched first
      };
      fetchData();
    }
  }, [isAuthenticated]); // Fetch data when authentication state changes

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      // Only fetch for the logged-in user
      fetchBlogsByUser(user.id);
      fetchCategoriesByUser(user.id);
    }
  }, [user, isAuthenticated]); // Run when user or authentication changes

  useEffect(() => {
    if (user?.id && allBlogs.length > 0) {
      setUserBlogs(allBlogs.filter((blog) => blog.author === user.id));
    }
  }, [allBlogs, user]);

  useEffect(() => {
    if (user?.id && categories.length > 0) {
      setUserCategories(
        categories.filter((category) => category.author === user.id)
      );
    }
  }, [categories, user]);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - 25% width with dark background */}
      <div className="w-1/4 bg-purple-500 text-white p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Blog Admin</h2>
        </div>

        <nav>
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 hover:bg-purple-700 rounded-lg"
              >
                <FiMenu className="text-xl" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 hover:bg-purple-700 rounded-lg"
              >
                <FiFileText className="text-xl" />
                <span>Posts</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 hover:bg-purple-700 rounded-lg"
              >
                <FiFolder className="text-xl" />
                <span>Categories</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 hover:bg-purple-700 rounded-lg"
              >
                <FiUsers className="text-xl" />
                <span>Users</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 hover:bg-purple-700 rounded-lg"
              >
                <FiSettings className="text-xl" />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area - 75% width */}
      <div className="w-3/4 bg-gray-50 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {user?.fullName}!
          </h1>
          <p className="text-gray-600">Here's your blog overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Posts</p>
                <p className="text-3xl font-bold">{userBlogs.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiFileText className="text-blue-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Categories</p>
                <p className="text-3xl font-bold">{userCategories.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FiFolder className="text-green-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Comments</p>
                <p className="text-3xl font-bold">5</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FiUsers className="text-purple-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts Table */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Your Recent Posts</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {userBlogs.length > 0 ? (
                  userBlogs.map((blog) => (
                    <tr key={blog.id} className="border-b last:border-0">
                      <td className="py-4">{blog.title}</td>
                      <td>
                        {" "}
                        <td>
                          <div className="flex flex-wrap gap-2">
                            {blog.categories?.map((catId) => {
                              const category = categories.find(
                                (cat) => cat._id === catId
                              );

                              return (
                                <span
                                  key={catId}
                                  className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
                                >
                                  {category ? category.name : "Unknown"}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                      </td>
                      <td>
                        <span
                          className={`px-2 py-1 text-sm rounded-full ${
                            blog.status === "Published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {blog.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No posts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
