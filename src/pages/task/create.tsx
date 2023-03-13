import { type NextPage } from "next";
import Editor from "~/components/editor";
import StatusSelector from "~/components/status-selector";

const CreateTask: NextPage = () => {
  return (
    <>
      <input type="text" placeholder="title" />
      <StatusSelector />
      <Editor />
      <button>Submit</button>
    </>
  );
};

export default CreateTask;
