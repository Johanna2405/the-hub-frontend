const PostCard = () => {
  return (
    <div className="flex flex-col bg-[#D9E73B] gap-2 p-4 m-4 rounded-lg max-w-64">
      <h2 className="text-[#181B4D] font-bold text-lg">Post Title</h2>
      <p className="text-[#181B4D] text-sm font-light">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sit culpa
        dolores non voluptatum totam minus hic aliquid dolorem quos aut beatae
        dolor nesciunt tempore fugit vitae, laborum ipsum dignissimos?
      </p>
      <p className="text-[#181B4D] font-semibold">View full post</p>
      <div className="flex justify-end">
        <button className="text-[#181B4D] btn btn-square btn-ghost hover:text-white">
          ^
        </button>
      </div>
    </div>
  );
};

export default PostCard;

// colors:
// text [#181B4D]
// primary [#D4DEE8]
// neon [#D9E73B]
