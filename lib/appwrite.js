import { Client, Account, ID, Databases, Query, Storage } from "react-native-appwrite"

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.barcode.com',
  projectId: '66e95581000026f59f19',
  databaseId: '66e9561600268df5d98d',
  collectionId: '66e9567e0000864a7565',
  userCollectionId: '66e956570003d15d2077',
  productId: '66eeed2d0000a621f4d3',
  storageId: '66f4e2b300339d678872',
}

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const storage = new Storage(client);
const databases = new Databases(client);

// Admin function
export async function signInAdmin(username, password) {
  try {
    // Retrieve the admin document matching the username
    const { documents } = await databases.listDocuments(config.databaseId, config.collectionId, [
      Query.equal('admin_username', username)
    ]);

    if (documents.length === 0) throw new Error('Invalid username');

    if (password === documents[0].admin_password) {
      // Successful login, create a session or token manually
      const session = {
        message: 'Logged in successfully',
        adminId: documents[0].$id,
        username: documents[0].admin_username,
      };

      return session;
    } else {
      throw new Error('Invalid password');
    }
  } catch (error) {
    throw new Error('Authentication failed: ' + error.message);
  }
}

// User function
export async function createUser(email, username, password) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password
    );
  
    if (!newAccount) throw new Error("Failed to create account.");

    // Sign in the user after successful account creation
    await userSignIn(email, password);
  
    // Save additional user details (username) to the database
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id, // Link to the Appwrite account ID
        email: email,
        username: username, 
        password: password,
      }
    );
  
    return newUser;
  } catch (error) {
    console.log("Error creating user: ", error);
    throw new Error(error.message || "Account creation failed.");
  }
}


export async function userSignIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// User sign-out
export async function userSignOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Admin product
export async function getAllProduct() {
  try {
    const product = await databases.listDocuments(
      config.databaseId,
      config.productId,
    );
    
    return product;
  } catch (error) {
    throw new Error(error);
  }
}

// Admin Insertion of Product
export async function createProduct(productData) {
  try {
    const response = await databases.createDocument(
      config.databaseId,
      config.productId,
      ID.unique(),
      productData
    );

    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}
