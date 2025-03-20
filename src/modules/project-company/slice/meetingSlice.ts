import { createSlice } from "@reduxjs/toolkit";

const meetingSlice = createSlice({
    name: 'meetingSlice',
    initialState: {
        meetings: [],
        selectedMeeting: null
    },
    reducers: {
        setMeetings: (state, action) => {
            state.meetings = action.payload
        },
        selectMeeting: (state, action) => {
            state.selectedMeeting = action.payload
        }
    }
})

export const {setMeetings,selectMeeting}=meetingSlice.actions

export default meetingSlice.reducer