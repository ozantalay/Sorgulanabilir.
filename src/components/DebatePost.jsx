import { useState } from "react";
import PostComments from "./PostComments";
import PostContent from "./PostContent";
import postData from "../postData";

export default function DebatePost() {
  const [comments, setComments] = useState(postData.comments);
  const [newComment, setNewComment] = useState({
    userName: "",
    commentText: "",
    isAnonymous: false,
    id: crypto.randomUUID(),
  });

  const handleComment = (e) => {
    const { name, value, checked, type } = e.target;
    setNewComment((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (newComment.commentText.trim() === "" || 
        (newComment.userName.trim() === "" && !newComment.isAnonymous)) {
      alert("Lütfen kullanıcı adı ve yorum metni girin.");
      return;
    }

    const newUsername = newComment.isAnonymous ? "AnonimKullanıcı" : newComment.userName;

    const commentToAdd = {
      userName: newUsername,
      commentText: newComment.commentText,
      id: newComment.id,
    };

    console.log("Yeni yorum:", commentToAdd);
    setComments((prev) => [...prev, commentToAdd]);

    // Formu temizle
    setNewComment({
      userName: "",
      commentText: "",
      isAnonymous: false,
      id: crypto.randomUUID(),
    });
  };

  return (
    <div className="post-container">
      <PostContent data={{ ...postData }} />
      <PostComments data={comments} />
      <form onSubmit={handleSubmit}>
        <input
          className="text-input"
          type="text"
          name="userName"
          placeholder="Kullanıcı adı girin."
          value={newComment.userName}
          onChange={handleComment}
        />
        <textarea
          name="commentText" 
          placeholder="Ne düşünüyorsunuz?"
          value={newComment.commentText} 
          onChange={handleComment}
        />
        <label>
          <input
            className="checkbox"
            type="checkbox"
            name="isAnonymous" 
            checked={newComment.isAnonymous}
            onChange={handleComment}
          />
          İsimsiz mi göndereyim?
        </label>
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
}
