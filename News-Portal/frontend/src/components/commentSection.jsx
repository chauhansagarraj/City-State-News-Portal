import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, addComment, addReply } from "../store/slices/commentSlice";

const CommentSection = ({ articleId, close, currentUser }) => {
    const dispatch = useDispatch();
    const { comments, loading } = useSelector((state) => state.comments);

    const [content, setContent] = useState("");
    const [replyTo, setReplyTo] = useState(null);
    const [replyText, setReplyText] = useState("");

    useEffect(() => {
        if (articleId) {
            dispatch(fetchComments(articleId));
        }
    }, [articleId, dispatch]);

    // Post top-level comment
    const handlePost = () => {
        if (!content.trim()) return;

        dispatch(addComment({ articleId, content }));
        setContent("");
    };

    // Post reply
    const handleReply = (parentId) => {
        if (!replyText.trim()) return;

        // Only send to backend, do not update state directly
        dispatch(
            addReply({
                articleId,
                parentCommentId: parentId,
                content: replyText,
            })
        );

        setReplyText("");
        setReplyTo(null);
        // Do NOT update state.comments here
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
            <div className="w-[400px] bg-white h-full p-4 overflow-y-auto">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold">Comments</h2>
                    <button onClick={close}>✖</button>
                </div>

                {/* Top-level comment input */}
                <textarea
                    className="w-full border p-2 rounded"
                    placeholder="Write your comment..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    onClick={handlePost}
                    className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                >
                    Post
                </button>

                {/* Comments list */}
                <div className="mt-6">
                    {loading && <p>Loading comments...</p>}

                    {comments.map((c) => (
                        <div key={c._id} className="border-b py-2">
                            <p className="font-semibold">{c.user.name}</p>
                            <p>{c.content}</p>

                            {/* Reply button only if comment not by current user */}
                         {currentUser?.id && c.user?._id &&
  c.user._id.toString() !== currentUser.id && (
    <button
      className="text-blue-500 text-sm mt-1"
      onClick={() => setReplyTo(c._id)}
    >
      Reply
    </button>
)}

                            {/* Reply input */}
                            {replyTo === c._id && (
                                <div className="mt-2 ml-4">
                                    <input
                                        type="text"
                                        placeholder="Write a reply..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        className="border p-1 w-full"
                                    />
                                    <button
                                        onClick={() => handleReply(c._id)}
                                        className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        Post
                                    </button>
                                </div>
                            )}

                            {/* Replies */}
                            <div className="ml-6 mt-2">
                                {c.replies?.map((r) => (
                                    <div key={r._id} className="border-l pl-3 mb-2">
                                        <p className="font-semibold">{r.user.name}</p>
                                        <p>{r.content}</p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommentSection;