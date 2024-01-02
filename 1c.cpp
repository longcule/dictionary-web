

#include "common.h"

void ResourceRequest(SystemInfo & info, queue & result) {
    // Tính toán số lượng tài nguyên đã sử dụng
    vector<int> usedResources(NTT_RESOURCE_N  , 0);
    for (int i = 0; i < NTT_PROCESS_M; ++i) {
        for (int j = 0; j < NTT_RESOURCE_N; ++j) {
            usedResources[j] += info.Allocation[i][j];
        }
    }
    
    // Kiểm tra các yêu cầu tài nguyên
    for (int i = 0; i < NTT_PROCESS_M; ++i) {
        // Kiểm tra yêu cầu có lớn hơn nhu cầu không
        bool overNeeds = false;
        for (int j = 0; j < NTT_RESOURCE_N; ++j) {
            if (info.Request[i][j] > info.Need[i][j]) {
                overNeeds = true;
                break;
            }
        }
        if (overNeeds) {
            result.push_back(RequestResp(i, -2));
            continue;
        }
        
        // Kiểm tra yêu cầu có được đáp ứng không
        bool State = true;
        for (int j = 0; j < NTT_RESOURCE_N; ++j) {
            if (info.Request[i][j] > (info.Available[j] - usedResources[j])) {
                State = false;
                break;
            }
        }
        if (State) {
            // Thực hiện cấp phát tài nguyên và cập nhật thông tin
            for (int j = 0; j < NTT_RESOURCE_N; ++j) {
                info.Available[j] -= info.Request[i][j];
                info.Allocation[i][j] += info.Request[i][j];
                info.Need[i][j] -= info.Request[i][j];
                usedResources[j] += info.Request[i][j];
            }
            result.push_back(RequestResp(i, 0));
        } else {
            // Yêu cầu không thể được đáp ứng và có thể gây deadlock
            bool deadlockState = true;
            for (int j = 0; j < NTT_RESOURCE_N; ++j) {
                if (info.Request[i][j] <= info.Available[j]) {
                    deadlockState = false;
                    break;
                }
            }
            if (deadlockState) {
                result.push_back(RequestResp(i, -1));
            } else {
                // Yêu cầu phải đợi
                result.push_back(RequestResp(i, -3));
            }
        }
    }
}


void printResult(queue& result) {
  while(!result.empty()){
        cout << "Request " << result.front()._processID << " - " << result.front()._status;
        result.pop_back();
        cout << endl;
  }
}

// void ResourceRequest(SystemInfo& info, queue& result) {
//     // Initialize the work and finish vectors
//     vector<int> work(NTT_RESOURCE_N, 0);
//     vector<bool> finish(NTT_PROCESS_M, false);
 
//     // Set the work vector equal to the available vector
//     for (int i = 0; i < NTT_RESOURCE_N; i++) {
//         work[i] = info.Available[i];
//     }
 
//     // Loop through each process to find one that can be finished
//     bool finished = false;
//     while (!finished) {
//         // Assume that no process can be finished
//         finished = true;
 
//         // Loop through each process
//         for (int pid = 0; pid < NTT_PROCESS_M; pid++) {
//             // Check if the process has not been finished yet and if it has a need less than or equal to the work vector
//             if (!finish[pid]) {
//                 bool needLessThanWork = true;
//                 for (int i = 0; i < NTT_RESOURCE_N; i++) {
//                     if (info.Need[pid][i] > work[i]) {
//                         needLessThanWork = false;
//                         break;
//                     }
//                 }
//                 // If the process has a need less than or equal to the work vector, it can be finished
//                 if (needLessThanWork) {
//                     // Add the allocated resources of the process back to the work vector
//                     for (int i = 0; i < NTT_RESOURCE_N; i++) {
//                         work[i] += info.Allocation[pid][i];
//                     }
 
//                     // Mark the process as finished and add it to the result queue
//                     finish[pid] = true;
//                     result.push_back(RequestResp(pid, 0));
 
//                     // Set the finished flag to false so the loop continues
//                     finished = false;
//                 }
//             }
//         }
//     }
 
//     // Check if the state is safe after granting the request
//     bool safe = true;
//     for (int pid = 0; pid < NTT_PROCESS_M; pid++) {
//         if (!finish[pid]) {
//             bool needLessThanWork = true;
//             for (int i = 0; i < NTT_RESOURCE_N; i++) {
//                 if (info.Need[pid][i] > work[i]) {
//                     needLessThanWork = false;
//                     break;
//                 }
//             }
//             if (!needLessThanWork) {
//                 safe = false;
//                 break;
//             }
//         }
//            // If the state is not safe, undo the grant and set the status to -1
//     if (!safe) {
//         for (int i = 0; i < NTT_RESOURCE_N; i++) {
//             info.Allocation[pid][i] -= info.Request[pid][i];
//             info.Available[i] += info.Request[pid][i];
//         }
//         result.push_back(RequestResp(pid, -1));
//     }
//     // Otherwise, update the system info with the granted request and set the status to 0
//     else {
//         for (int i = 0; i < NTT_RESOURCE_N; i++) {
//             info.Available[i] -= info.Request[pid][i];
//             info.Allocation[pid][i] += info.Request[pid][i];
//         }
//         result.push_back(RequestResp(pid, 0));
//     }
//   }







void ResourceRequest(SystemInfo & info, queue & result) {
  int count = 0;
  while (count >= NTT_PROCESS_M)
  {
  for(int i = 0; i < NTT_PROCESS_M; i++) {
    bool checkOne = true;
    bool checkTwo = true;
    int finish[NTT_PROCESS_M];
    for(int j = 0 ; j < NTT_PROCESS_M; j++ ) {
      finish[j] = 0;
    } 
    for(int j = 0; j < NTT_RESOURCE_N; j++) {
      if (info.Request[i][j] > info.Need[i][j]) {
        checkOne = false;
        break;
      }
    }
    if (checkOne) {
      result.push_back(RequestResp(count, -2));
      continue;
    }
    for(int j = 0; j < NTT_RESOURCE_N; j++) {
      if (info.Request[i][j] > info.Available[j]) {
        checkTwo = false;
        break;
      }
    }
    if (checkTwo) {
      result.push_back(RequestResp(count, -3));
      continue;
    }

    // int work[NTT_RESOURCE_N];
    // for (int j = 0; j < NTT_RESOURCE_N; j++) {
    //     work[j] = info.Available[j] - info.Request[i][j];
    // }
    }
    count ++;
  }
}


