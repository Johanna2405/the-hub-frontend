const EmptyList = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 text-center space-y-4">
      <p className="text-lg font-medium text-muted-foreground">
        Your list is empty.
      </p>
      <p className="text-sm text-muted-foreground">
        Add some lists to get started!
      </p>
    </div>
  );
};

export default EmptyList;
