<script>
  import { db } from "./firebase";

  let task = {
    name: "",
    description: "",
  };
  let tasks = [];
  let editStatus = false; // app status

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

  const handleSubmit = () => {
    addTask();
    task = {
      name: "",
      description: "",
    };
  };

  const deleteTask = async id => {
    await db.collection('task').doc(id).delete();
  };

  const editTask = currentTask => {
    editStatus = true; //app status
    task.name = currentTask.name;
    task.description = currentTask.description;
  }
  const onCancel = () => {
    
  }

</script>

<form on:submit|preventDefault={handleSubmit}>
  <input bind:value={task.name} type="text" placeholder="write a new task" />
  <textarea
    bind:value={task.description}
    type="text"
    placeholder="write a  task description"
    rows="3"
  />
  <button> 
    
    {#if !editStatus}Save {:else}Update{/if}
    
  </button>
  {#if editStatus}
  <button on:click={onCancel}>cancel</button>
  {/if}
</form>

{#each tasks as task}
  <div>
    <h5>{task.name}</h5>
    <p>{task.description}</p>
    <button on:click={deleteTask(task.id)}>Delete</button>
    <button on:click={editTask(task)}>Edit</button>
  </div>
{/each}

<style>
</style>
