<script>
  import { db } from "./firebase";

  let task = {
    name: "",
    description: "",
  };
  let tasks = [];
  let editStatus = false; // app status
  let currentId;

  // funcion para traer objetos guardados en firebase
  db.collection("task").onSnapshot((querySnapshot) => {
    let docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    tasks = [...docs];
    // console.log(tasks);
  });

  const addTask = async () => {
    await db
      .collection("task")
      .doc()
      .set({
        ...task,
        createdAt: Date.now(),
      });
    alert("new task created");
  };

  const updateTask = async () => {
    await db.collection("task").doc(currentId).update(task);
  };

  const handleSubmit = () => {
    if (!editStatus) {
      addTask();
    } else {
      // updateTask();
      updateTask(currentId);
    }

    //reset object
    task = { name: "", description: "" };
  };
  // delete task
  const deleteTask = async (id) => {
    await db.collection("task").doc(id).delete();
  };

  // edit task
  const editTask = (currentTask) => {
    editStatus = true; //app status
    task.name = currentTask.name;
    task.description = currentTask.description;
    currentId = currentTask.id;
  };

  // cancel to update
  const onCancel = () => {
    editStatus = false;
    task.name = "";
    task.description = "";
  };
</script>

<main class="container h-auto">
  <div>
    <h1 class="text-center m-2">TaskAPP</h1>
  </div>
  <form on:submit|preventDefault={handleSubmit} class="card card-body">
    <div class="form-group">
      <input
      bind:value={task.name}
      type="text"
      placeholder="write a new task"
      class="form-control"
    />
    </div>
    <div class="form-group">
      <textarea
      bind:value={task.description}
      type="text"
      placeholder="write a  task description"
      rows="3"
      class="form-control"
    />
    </div>
    <button class="btn btn-primary">
      {#if !editStatus}Save {:else}Update{/if}
    </button>
    {#if editStatus}
      <button on:click={onCancel} class="btn btn-info mt-2">cancel</button>
    {/if}
  </form>

  {#each tasks as task}
    <div class="card card-body mt-4">
      <h5>{task.name}</h5>
      <p>{task.description}</p>
      <button on:click={deleteTask(task.id)} class="btn btn-danger"
        >Delete</button
      >
      <button on:click={editTask(task)} class="btn btn-info mt-2">Edit</button>
    </div>
  {/each}
  
</main>
<footer class="footer p-3 mt-4 text-center bg-light">
  Development By <a href="http://www.studio.dev">StudioDev</a>
</footer>

<style>
</style>
