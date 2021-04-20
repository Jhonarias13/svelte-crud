<script>
  import { db } from "./firebase";
  import toastr from "toastr";

  let groups = [
    { id: 1, text: "2A" },
    { id: 2, text: "2B" },
    { id: 3, text: "4A" },
    { id: 4, text: "4B" },
  ];
  let task = {
    name: "",
    group: "",
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
  });

  const addTask = async () => {
    await db
      .collection("task")
      .doc()
      .set({
        ...task,
        createdAt: Date.now(),
      });
    // toastr, se activan las notificaciones
    toastr.success("New Task created", {
      timeOut: 1000,
    });
  };

  const updateTask = async () => {
    await db.collection("task").doc(currentId).update(task);
    editStatus = false;
  };

  const handleSubmit = () => {
    if (!editStatus) {
      addTask();
    } else {
      updateTask(currentId);
    }

    //reset object
    task = { name: "", group: "", description: "" };
    console.log(task);
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
    task.group = currentTask.group;
    currentId = currentTask.id;
  };

  // cancel to update
  const onCancel = () => {
    editStatus = false;
    task.name = "";
    task.description = "";
  };

  // agregando funcionalidad de grabar audio
  const init = () => {
    // soporte para navegadores compatibles, init de la funcion
    const tieneSoporteUserMedia = () => {
      !!navigator.mediaDevices.getUserMedia;

      // si no soporta..
      // lanzar aviso para que usen un navegador decente
      if (typeof MediaRecorder === "undefined" || !tieneSoporteUserMedia()) {
        return alert(
          "Tu navegador web no cumple los requisitos; Por favor, actualiza a un navegador decente como Google Chrome o Firefox."
        );
      }
      // Elementos del DOM aquí =>
    };
  };

  // esperar a que el documento este listo
  document.addEventListener("DomContentLoaded", init);
</script>

<!--Fin script-->
<main class="container">
  <div class="header">
    <h1 class="text-center m-4">NotAPP</h1>
  </div>

  <form on:submit|preventDefault={handleSubmit} class="card card-body">
    <div class="form-group">
      <input
        bind:value={task.name}
        type="text"
        placeholder="Pon tu nombre aquí"
        class="form-control"
        required
      />
    </div>
    <!-- lista de grupos -->
    <div class="form-group">
      <select bind:value={task.group} id="grado" class="custom-select">
        <option selected>Elije tu grupo...</option>
        {#each groups as group}
          <option value={group}>{group.text}</option>
        {/each}
      </select>
    </div>
    <!--fin lista de grupo-->

    <!--Lista de Dispositivos-->
    <div class="form-group">
      <select class="custom-select">
        <option selected>Seleccione un dispositivo...</option>
      </select>
    </div>
    <div class="form-group d-flex justify-content-around">
      <button class="btn btn-danger">Grabar</button>
      <button class="btn btn-success" disabled>Detener</button>
    </div>
    <!--Fin lista de dispositivos-->

    <!-- <div>
      <audio controls></audio>
    </div> -->

    <div class="form-group mt-3">
      <textarea
        bind:value={task.description}
        type="text"
        placeholder="Escribe una nota o descripción(opcional)"
        rows="3"
        class="form-control"
      />
    </div>

    <!--Buttons-->
    <button class="btn btn-primary" disabled={!task.name}>
      {#if !editStatus}
        Save<i class="fas fa-upload fa-lg ml-2" />
      {:else}
        <i class="fas fa-check fa-lg mr-2" />Update
      {/if}
    </button>

    {#if editStatus}
      <button on:click={onCancel} class="btn btn-info mt-2">
        <i class="far fa-window-close fa-lg mr-2" />Cancel
      </button>
    {/if}
  </form>
  <!--End Buttons-->

  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
    {#each tasks as task}
      <div class="col task">
        <div class="card card-body mt-4">
          <div class="d-flex justify-content-between align-items-center">
            <h5>{task.name}</h5>
            <i class="fas fa-pen fa-lg" on:click={editTask(task)} />
          </div>
          <p><strong>Grupo:</strong> {task.group.text}</p>
          <p><strong>Descripción:</strong> {task.description}</p>
          <button on:click={deleteTask(task.id)} class="btn btn-danger"
            ><i class="far fa-trash-alt fa-lg" /></button
          >
        </div>
      </div>
    {/each}
  </div>
  <!--Fin de tareas creadas-->
</main>
<!--Fin Main-->
<footer class="footer p-1 mt-4 text-center bg-light fixed-bottom">
  NotAPP &copy; 2021 🚀 Development By <a href="http://www.studio.dev"
    >StudioDev</a
  >
</footer>

<style>
  .task:last-child {
    margin-bottom: 3rem;
  }

  @media screen and (min-width: 576px) {
    form {
      max-width: 100%;
    }
  }
</style>
