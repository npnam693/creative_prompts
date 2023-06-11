"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const promptID = useSearchParams().get("id");
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/prompt/${promptID}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptID) fetchPost();
  }, [promptID]);

  const UpdatePromptFunc = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptID) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptID}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={UpdatePromptFunc}
    />
  );
};

export default UpdatePrompt;
