import { showToast } from "../store/slices/uiMessageSlice";

const ArticleReviewModal = ({ article, onClose, dispatch, actions }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center  justify-center z-50">

<div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg p-6 relative">        {/* ❌ Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 text-xl"
        >
          ✖
        </button>

        {/* 📰 Article Info */}
        <h2 className="text-xl font-semibold mb-4">
          Article Review
        </h2>

        <div className="space-y-4">

          <p><b>Title:</b> {article.title}</p>
          <p><b>Author:</b> {article.author?.name}</p>
          <p><b>State:</b> {article.state}</p>
          <p><b>City:</b> {article.city}</p>


          {/*  Content */}
          <div>
            <b>Content:</b>
            <div className="mt-2 p-3 border rounded max-h-60 overflow-y-auto bg-gray-50">
              {article.content}
            </div>
          </div>

          {/* Optional fields */}
          {article.category && (
            <p><b>Category:</b> {article.category}</p>
          )}

          {article.tags && (
            <p><b>Tags:</b> {article.tags.join(", ")}</p>
          )}

            <div>
                        <h3 className="font-semibold mb-2">ID Proof</h3>

                        {article.images ? (
                            <img
                                src={article.images[0]}
                                alt="proof"
                                className="rounded border w-full object-contain max-h-64"
                            />
                        ) : (
                            <p>No image uploaded</p>
                        )}
                    </div>



        </div>

        {/*  Actions */}
        <div className="flex justify-end gap-4 mt-6">

          <button
            onClick={() => {
              dispatch(actions.approve(article._id))
                .unwrap()
                .then(() => {
                  dispatch(showToast({ message: "Article approved" }));
                });
              onClose();
            }}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Approve
          </button>

          <button
            onClick={() => {
              const reason = prompt("Enter rejection reason");
              dispatch(actions.reject({ id: article._id, reason }))
                .unwrap()
                .then(() => {
                  dispatch(showToast({ message: "Article rejected" }));
                });
              onClose();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Reject
          </button>

        </div>

      </div>
    </div>
  );
};

export default ArticleReviewModal;