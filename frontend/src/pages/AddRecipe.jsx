export default function AddRecipe() {
  return (
    <div>
      <h1>Add New Recipe</h1>
      <form>
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Ingredients (comma separated)" />
        <textarea placeholder="Instructions"></textarea>
        <input type="text" placeholder="Image URL" />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}
