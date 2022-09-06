const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const totalLikes = likes.reduce((acc, curr) => acc + curr, 0);
  return totalLikes;
};

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
  const favorite = blogs.filter((blog) => blog.likes === maxLikes)[0];
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  const authorList = blogs.reduce((prev, curr) => {
    const existingAuthor = prev.find(
      (authorObj) => authorObj.author === curr.author,
    );
    if (!existingAuthor)
      return [
        ...prev,
        {
          author: curr.author,
          blogs: 1,
        },
      ];
    else {
      return prev.map((authorObj) => {
        return authorObj.author === curr.author
          ? { ...authorObj, blogs: authorObj.blogs + 1 }
          : authorObj;
      });
    }
  }, []);

  const maxBlogCount = Math.max(...authorList.map((author) => author.blogs));
  return authorList.filter((author) => author.blogs === maxBlogCount)[0];
};

const mostLikes = (blogs) => {
  const authorList = blogs.reduce((prev, curr) => {
    const existingAuthor = prev.find(
      (authorObj) => authorObj.author === curr.author,
    );
    if (!existingAuthor)
      return [...prev, { author: curr.author, likes: curr.likes }];
    else {
      return prev.map((authorObj) => {
        return authorObj.author !== curr.author
          ? authorObj
          : {
              ...authorObj,
              likes: authorObj.likes + curr.likes,
            };
      });
    }
  }, []);

  const maxLikes = Math.max(...authorList.map((author) => author.likes));
  return authorList.filter((author) => author.likes === maxLikes)[0];
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
