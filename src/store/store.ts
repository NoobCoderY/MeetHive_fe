import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createTransform, persistStore } from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import authReducer from '@/modules/auth/auth-slice';
import { authApi } from '@/modules/auth/services/authApi';
import { meetingApi } from '@/modules/project-company/services/meetingApi';
import { transcriptionApi } from '@/modules/transcription/sevices/transcription';
import CompanyReducer from '@/modules/project-company/slice/companySlice';
import projectReducer from '@/modules/project-company/slice/ProjectSlice';
import { companyApi } from '@/modules/project-company/services/companyApi';
import { projectApi } from '@/modules/project-company/services/projectApi';
import transcriptionReducer from '@/modules/transcription/slice/transcriptionSlice';
import meetingReducer from '@/modules/project-company/slice/meetingSlice';
import { ITranscriptionState } from '@/modules/transcription/slice/transcriptionSlice';
import layoutReducer from '@/modules/core/slice/layoutSlice';
import restrcitionReducer from '@/modules/core/slice/restrcitionSlice';
import { restrictionApiApi } from '@/modules/core/services/restriction';
import { summaryApi } from '@/modules/summary/services/summary';
import summaryReducer from '@/modules/summary/slice/summary'
import { feedbackApi } from '@/modules/feedback/services/feedback';
import { supportApi } from '@/modules/support/services/support';
import { logout } from '@/modules/auth/auth-slice';
import { globalSearchApi } from '@/modules/global-search/services/globalSearch';
import { uploadRecordingApi } from '@/modules/upload-recording/services';

/**
 * Configures the Redux store with persistence and API middleware.
 *
 * This setup includes the following configurations:
 * - Persistence using `redux-persist`.
 * - Combination of reducers including `authApi`, `userApiSlice`, and `authReducer`.
 * - Application of default middleware and API middleware.
 *
 * @constant {object} persistConfig - Configuration for `redux-persist`, specifying the key and storage.
 * @constant {Reducer} rootReducer - The combined reducer for the Redux store.
 * @constant {Reducer} persistedReducer - The persisted version of the root reducer.
 * @constant {Store} store - The configured Redux store.
 * @constant {Persistor} persistor - The persistor instance for the store.
 *
 * @typedef {function} AppDispatch - Type for the Redux store's dispatch function.
 * @typedef {object} RootState - Type for the Redux store's state.
 */

// Define a transform to persist only 'currentTranscription'
const transcriptionTransform = createTransform<
  ITranscriptionState,
  ITranscriptionState
>(
  (inboundState) => ({
    currentTranscription: inboundState.currentTranscription,
    recordingPermission: inboundState.recordingPermission,
    ...inboundState,
  }),
  (outboundState) => ({
    currentTranscription: outboundState.currentTranscription || { content: [] },
    recordingPermission: false,
    ...outboundState,
  }),
  { whitelist: ['transcription'] }
);

const persistConfig = {
  key: 'root',
  storage,
  transforms: [transcriptionTransform],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [companyApi.reducerPath]: companyApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
  [meetingApi.reducerPath]: meetingApi.reducer,
  [transcriptionApi.reducerPath]: transcriptionApi.reducer,
  [restrictionApiApi.reducerPath]: restrictionApiApi.reducer,
  [summaryApi.reducerPath]: summaryApi.reducer,
  [feedbackApi.reducerPath]: feedbackApi.reducer,
  [supportApi.reducerPath]: supportApi.reducer,
  [globalSearchApi.reducerPath]: globalSearchApi.reducer,
  [uploadRecordingApi.reducerPath]: uploadRecordingApi.reducer,
  summary: summaryReducer,
  transcription: transcriptionReducer,
  auth: authReducer,
  company: CompanyReducer,
  project: projectReducer,
  meeting: meetingReducer,
  layout: layoutReducer,
  restriction: restrcitionReducer,
});

/**
 * Creates a root reducer that resets the state on logout.
 *
 * When the `logout` action is dispatched, the state is set to initial state,
 * effectively clearing the store. Otherwise, it processes actions normally
 * via the `rootReducer`.
 *
 * @returns {Function} A root reducer that clears the state on logout.
 */

const createReducer = () => {
  return (state: ReturnType<typeof rootReducer> | undefined, action: { type: string }) => {
    if (action.type === logout.type) { 
      state = undefined; 
    }
    return rootReducer(state, action);
  };
};

const persistedReducer = persistReducer(persistConfig, createReducer());

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      authApi.middleware,
      companyApi.middleware,
      projectApi.middleware,
      meetingApi.middleware,
      transcriptionApi.middleware,
      restrictionApiApi.middleware,
      summaryApi.middleware,
      feedbackApi.middleware,
      supportApi.middleware,
      globalSearchApi.middleware,
      uploadRecordingApi.middleware
    ) as any;
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
