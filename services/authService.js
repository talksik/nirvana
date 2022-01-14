export function requireAuthentication(gssp) {
  return async (context) => {
      const { req, res } = context;
      const token = req.cookies.userToken;

      if (!token) {
          // Redirect to login page
          return {
              redirect: {
                  destination: '/admin/login',
                  statusCode: 302
              }
          };
      }

      return await gssp(context); // Continue on to call `getServerSideProps` logic
  }
}