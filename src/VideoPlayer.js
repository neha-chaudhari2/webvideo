import React, { useState } from "react";

const VideoPlayer = () => {
  const [quality, setQuality] = useState("720p");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [plan, setPlan] = useState("Free");
  const [downloaded, setDownloaded] = useState(false);
  
  const videos = {
    "320p": "https://www.example.com/video-320p.mp4",
    "480p": "https://www.example.com/video-480p.mp4",
    "720p": "https://www.example.com/video-720p.mp4",
    "1080p": "https://www.example.com/video-1080p.mp4",
  };
  
  const plans = {
    "Free": 5,
    "Bronze": 7,
    "Silver": 10,
    "Gold": Infinity,
  };
  
  const addComment = () => {
    if (/[^a-zA-Z0-9 ]/.test(newComment)) return;
    const city = "Pune"; // Placeholder for city retrieval logic
    setComments([...comments, { text: newComment, city, likes: 0, dislikes: 0 }]);
    setNewComment("");
  };

  const likeComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].likes += 1;
    setComments(updatedComments);
  };

  const dislikeComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].dislikes += 1;
    if (updatedComments[index].dislikes >= 2) {
      updatedComments.splice(index, 1);
    }
    setComments(updatedComments);
  };

  const addGroup = () => {
    if (groupName.trim()) {
      setGroups([...groups, groupName]);
      setGroupName("");
    }
  };
  
  const handleDownload = () => {
    if (plan === "Free" && downloaded) {
      alert("You can only download one video per day. Upgrade to premium for unlimited downloads.");
      return;
    }
    setDownloaded(true);
    alert("Video downloaded successfully!");
  };
  
  const handlePlanUpgrade = (newPlan, price) => {
    alert(`Payment of Rs. ${price} successful! Your plan is now ${newPlan}.`);
    setPlan(newPlan);
  };

  return (
    <div style={{ background: "skyblue", height: "100vh", textAlign: "center", padding: "40px" }}>
      <h1>Video Player</h1>
      <video key={quality} controls width="800">
        <source src={videos[quality]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <br />
      <label>Quality: </label>
      <select value={quality} onChange={(e) => setQuality(e.target.value)}>
        {Object.keys(videos).map((q) => (
          <option key={q} value={q}>{q}</option>
        ))}
      </select>
      <br/><br/>
      <button onClick={handleDownload}>Download Video</button>
      
      <h2>Upgrade Plan</h2>
      <button onClick={() => handlePlanUpgrade("Bronze", 10)}>Bronze - Rs.10 (7 min limit)</button>
      <button onClick={() => handlePlanUpgrade("Silver", 50)}>Silver - Rs.50 (10 min limit)</button>
      <button onClick={() => handlePlanUpgrade("Gold", 100)}>Gold - Rs.100 (Unlimited)</button>
      
      <h2>Groups</h2>
      <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Enter group name" />
      <button onClick={addGroup}>Create Group</button>
      <ul>
        {groups.map((group, index) => (
          <li key={index}>{group}</li>
        ))}
      </ul>
      
      <h2>Comments</h2>
      <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment" />
      <button onClick={addComment}>Post</button>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            {comment.text} - <small>{comment.city}</small>
            <button onClick={() => likeComment(index)}>Like ({comment.likes})</button>
            <button onClick={() => dislikeComment(index)}>Dislike ({comment.dislikes})</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoPlayer;
