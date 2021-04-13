<script>
  import { db } from "./firebase";

  let task = {
    name: "",
    description: "",
  };

  const addTask = async () => {
    await db.collection("task").doc().set(task);
  };
  const handleSubmit = () => {
    addTask();
    alert("new task created");

  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input bind:value={task.name} type="text" placeholder="write a new task" />
  <textarea
    bind:value={task.description}
    type="text"
    placeholder="write a  task description"
    rows="3"
  />
  <button> Save </button>
</form>

<style>
</style>
