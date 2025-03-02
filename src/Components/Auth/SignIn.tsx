import {View, Text, Image, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {Button, Divider, TextInput} from 'react-native-paper';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Svg, Path} from 'react-native-svg';
import {useMutation} from 'react-query';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../store/userSlice';
import {navigate} from '../../helper/NavigationService';
import {useToast} from 'react-native-toast-notifications';
import {postRequest} from '../../ApiHandler';
import NavigationConstant from '../../Constant/NavigationConstant';

// Define the expected response from the backend
interface GoogleAuthResponse {
  success: boolean;
  error?: string;
  user?: {
    _id: string;
    username: string;
    email: string;
  };
}

const SignIn = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile', 'email'], // Added 'email' scope to get email in the token
      webClientId: process.env.REACT_APP_CLIENT_ID || '', // Ensure it's defined
      forceCodeForRefreshToken: true,
    });
  }, []);

  // Define the mutation with proper types
  const mutation = useMutation<any, Error, string>(
    (idToken: string) => postRequest(`/auth/google/${idToken}`),
    {
      onSuccess: response => {
        console.log('Sign-in successful:', response);
        if (response.success && response.user) {
          dispatch(
            loginSuccess({
              token: response.user.token, // Assuming the backend sends a token
              userInfo: {
                _id: response.user.id,
                username: response.user.username,
                email: response.user.email,
                profileImage: response.user.picture
                  ? response.user.picture
                  : null,
              },
            }),
          );
          navigate(NavigationConstant.TAB); // Navigate to the desired screen
          toast.show('Login successful!', {
            type: 'custom',
            duration: 4000,
            placement: 'bottom',
          });
        } else {
          console.error('Sign-in failed:', response.error);
          toast.show(response.error || 'Login failed!', {
            type: 'danger',
            duration: 4000,
            placement: 'bottom',
          });
        }
      },
      onError: error => {
        console.error('Error during sign-in:', error);
        toast.show('An error occurred during sign-in.', {
          type: 'danger',
          duration: 4000,
          placement: 'bottom',
        });
      },
    },
  );

  // Google sign-in function
  const login = async () => {
    try {
      // Ensure Google Play services are available
      await GoogleSignin.hasPlayServices();

      // Perform Google sign-in
      const userInfo = await GoogleSignin.signIn();
      // console.log('userInfo:', userInfo);

      // Extract the idToken from the sign-in response
      const idToken = userInfo.data?.idToken;

      if (!idToken) {
        throw new Error('No ID token returned from Google Sign-In');
      }

      // Trigger the mutation with the idToken
      const data = await mutation.mutateAsync(idToken);
    } catch (err: any) {
      console.log('Error during Google sign-in:', err.message);
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User canceled the login process');
        toast.show('Login canceled.', {
          type: 'warning',
          duration: 4000,
          placement: 'bottom',
        });
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
        toast.show('Play services not available.', {
          type: 'danger',
          duration: 4000,
          placement: 'bottom',
        });
      } else {
        console.log('Unknown error during sign-in:', err);
        toast.show('An unexpected error occurred.', {
          type: 'danger',
          duration: 4000,
          placement: 'bottom',
        });
      }
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-1">
        <View className="h-16 bg-[#2471A3]">
          <Svg height={200} viewBox="0 0 1400 320" width="100%">
            <Path
              opacity="1"
              fill="#2471A3"
              d="M0,32L60,64C120,96,240,160,360,165.3C480,171,600,117,720,101.3C840,85,960,107,1080,149.3C1200,192,1320,256,1380,288L1440,320L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            />
          </Svg>
        </View>
        <View className="flex-1 space-y-3 justify-center mx-5">
          <View className="justify-center items-center mt-8">
            <Image
              source={{
                uri: 'https://i.pinimg.com/564x/7b/01/44/7b0144b59c26bf18b525383292201446.jpg',
              }}
              style={{width: 80, height: 80, borderRadius: 50}}
            />
          </View>
          <View className="space-y-3">
            <TextInput
              className="bg-white px-2 rounded-full"
              mode="outlined"
              outlineColor="black"
              activeOutlineColor="black"
              placeholder="Email"
              outlineStyle={{borderRadius: 50}}
              textColor="#222"
              label="Email"
            />
            <TextInput
              className="bg-white px-2"
              mode="outlined"
              outlineColor="black"
              activeOutlineColor="black"
              placeholder="Password"
              outlineStyle={{borderRadius: 50}}
              secureTextEntry
              label="Password"
            />
            <Button
              mode="contained"
              onPress={() => {
                // Handle email/password login
                // Implement email/password authentication here
              }}
              style={{
                backgroundColor: '#00bcd4',
                elevation: 6,
                shadowRadius: 15,
                shadowOffset: {width: 1, height: 13},
              }}>
              <Text className="text-white text-base tracking-widest">
                Log in
              </Text>
            </Button>
          </View>

          <Divider />

          <View className="justify-center items-center">
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Standard}
              color={GoogleSigninButton.Color.Dark}
              onPress={login}
            />
          </View>

          <Text className="text-center text-base">
            Don't have an account?
            <Text className="text-base text-sky-700"> Signup</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
