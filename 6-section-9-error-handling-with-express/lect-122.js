//topic: 122. Errors Outside Express: Unhandled Rejections

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandled rejection 💥 shutting down..');
  server.close(() => {
    process.exit(1);
  });
});

