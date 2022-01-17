export function Loading() {
  return (
      <div class="container flex items-center justify-center gap-x-5 text-lg max-w-max">
        <div class="w-8 h-8  border-b-2 border-green-400 rounded-full animate-spin">
          <div class="w-8 h-8 border-b-2 border-green-400 rounded-full animate-spin"></div>
        </div>
        <p>Loading....</p>
    </div>
  );
}
