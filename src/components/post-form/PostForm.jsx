import React, { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import Button from "../Button"
import Input from "../Input"
import RTE from "../RTE"
import Select from "../Select"
import appwriteService from "../../appwrite/config"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active"
    }
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    try {
      let fileId = post?.featuredImage

      if (data.image?.[0]) {
        const file = await appwriteService.uploadFile(data.image[0])
        if (file) {
          if (post?.featuredImage) {
            await appwriteService.deleteFile(post.featuredImage)
          }
          fileId = file.$id
        }
      }

      const payload = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        featuredImage: fileId,
        status: data.status || "active",
        userId: userData.$id
      }

      const dbPost = post
        ? await appwriteService.updatePost(post.$id, payload)
        : await appwriteService.createPost(payload)

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } catch (error) {
      console.error("Post submission failed:", error)
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
    }
    return ""
  }, [])

  useEffect(() => {
    watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true })
      }
    })
  }, [watch, slugTransform, setValue])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-cyan-100 to-indigo-200 py-10 px-4 flex justify-center items-start">
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full max-w-5xl bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-blue-300 flex flex-wrap gap-6"
      >
        {/* Left Section */}
        <div className="w-full md:w-2/3">
          <Input
            label="Title"
            placeholder="Enter post title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug"
            placeholder="Auto-generated slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true
              })
            }}
          />
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/3">
          <Input
            label="Featured Image"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg"
            {...register("image", { required: !post })}
          />
          {post?.featuredImage && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg w-full object-cover"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            className={`w-full py-2 rounded-full ${
              post ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700"
            } text-white font-semibold transition duration-300 shadow-md`}
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  )
}