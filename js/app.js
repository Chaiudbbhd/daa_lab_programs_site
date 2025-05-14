const programKeys = ["N-Queens", "shortest", "tsp", "sum-of-subsets", "bfs",
      "kruskal", "disk", "warshall" , "quicksort" , "knapsack" , "merge(no random)" , "merge(random)" ,"prims"];
const datalist = document.getElementById('program-list');
programKeys.forEach(key => {
  const option = document.createElement('option');
  option.value = key;
  datalist.appendChild(option);
});
const programs = {
  "N-Queens": `#include<stdio.h>
  int x[10],count;
  int nQueens(int k,int n);
  int plae(int k,int i);
  int display(int n);
  int main(){
  int n;
  printf("Enter the number of queens:");
  scanf("%d",&n);
  nQueens(1,n);
  if(count==0)
    printf("\n no possible solutions for the number of Queens!");
  else
    printf("\n Number of possible soluions for %d queens is: %d",n,count);
  return 0;
  }
  int nQueens(int k,int n){
   int i;
   for(i=1;i<=n;i++){
    if(place(k,i)){
      x[k]=i;
      if(k==n)
        display(n);
      else
        nQueens(k+1,n);
    }
   }
  }
  int place(int k,int i){
  int j;
  for(j=1;j<k;j++)
    if((x[j]==i) ||(j-x[j]==k-i) || (j+x[j]==k+i))
      return 0;
  return 1;
  }
  int display(int n)
  {
  int i,j;
  char c[10][10];
  for(i=1;i<=n;i++)
    for(j=1;j<=n;j++)
      c[i][j]='-';
  for(i=1;i<=n;i++)
    c[i][x[i]]='Q';
  printf("\n Solution #%d\n",++count);
  for(i=1;i<=n;i++)
  {
    for(j=1;j<=n;j++)
      printf("%c\t",c[i][j]);
    printf("\n");
        }
  }`
  ,
        "shortest": `#include<stdio.h>
  #include<limits.h>
  #define INF INT_MAX
  int main(){
  int m,n,i,j,k;
  printf("enter matrix rows and columns");
  scanf("%d %d", &m,&n);
  int ar[m][n];
  printf("enter matrix elements(use -1 for no path):\n");
  for(i=0;i<m;i++)
  {
  for(j=0;j<n;j++){
  scanf("%d",&ar[i][j]);
  if(ar[i][j]==-1&&i!=j){
  ar[i][j]=INF;
  }
  }
  }
  for(k=0;k<m;k++){
  for(i=0;i<m;i++){
  for(j=0;j<n;j++){
  if(ar[i][k]!=INF&&ar[k][j]!=INF&&ar[i][j]>ar[i][k]+ar[k][j]){
  ar[i][j]=ar[i][k]+ar[k][j];
         }
  }
  }
  }
  printf("updated matrix after applying floyd-warshall:\n");
  for(i=0;i<m;i++){
  for(j=0;j<n;j++){
  if(ar[i][j]==INF){
  printf("INF ");
  }else{
  printf("%d",ar[i][j]);
  }
  }
  printf("\n");
  }
  return 0;
  }`,
        "tsp": `#include <stdio.h>
  #include <limits.h>
  #define MAX 10
  #define INF INT_MAX
  
  int n;
  int dist[MAX][MAX];
  int dp[MAX][1 << MAX];
  int path[MAX][1 << MAX];  // To store the next city in the path
  
  int tsp(int pos, int mask) {
      if (mask == (1 << n) - 1)
          return dist[pos][0]; // return to start
  
      if (dp[pos][mask] != -1)
          return dp[pos][mask];
  
      int mc = INF, city;
  
      for (city = 0; city < n; city++) {
          if ((mask & (1 << city)) == 0) {  // if city not visited
              int newCost = dist[pos][city] + tsp(city, mask | (1 << city));
              if (newCost < mc) {
                  mc = newCost;
                  path[pos][mask] = city; // store the next city
              }
          }
      }
      return dp[pos][mask] = mc;
  }
  
  void printPath() {
      int mask = 1;  // start with only city 0 visited
      int pos = 0;
  
      printf("The path is: ");
      printf("0 ");
      while (mask != (1 << n) - 1) {
          int nextCity = path[pos][mask];
          printf("-> %d ", nextCity);
          mask |= (1 << nextCity);
          pos = nextCity;
      }
      printf("-> 0\n");  // return to starting city
  }
  
  int main() {
      int i, j;
      printf("Enter the number of cities: ");
      scanf("%d", &n);
  
      if (n > MAX) {
          printf("Number of cities exceeds the max limit (%d).\n", MAX);
          return 1;
      }
  
      printf("Enter the distance matrix (%dx%d):\n", n, n);
      for (i = 0; i < n; i++)
          for (j = 0; j < n; j++)
              scanf("%d", &dist[i][j]);
  
      // Initialize DP and path tables
      for (i = 0; i < MAX; i++)
          for (j = 0; j < (1 << MAX); j++) {
              dp[i][j] = -1;
              path[i][j] = -1;
          }
  
      int minCost = tsp(0, 1);  // Start from city 0 with mask 1
  
      printf("The minimum cost of the tour is: %d\n", minCost);
      printPath();
  
      return 0;
  }`,
        "sum-of-subsets":   `#include <stdio.h>
  
  int n, a[100], x[100], total, sol_no = 0;
  
  void sumOfSubset(int sum, int k, int rem);
  
  void main() {
      int i, rem = 0;
  
      printf("Enter the number of elements: ");
      scanf("%d", &n);
  
      printf("Enter the elements:\n");
      for (i = 1; i <= n; i++) {
          scanf("%d", &a[i]);
          rem += a[i];
      }
  
      printf("Enter the sum total to be computed: ");
      scanf("%d", &total);
  
      printf("The possible combinations are:\n");
      sumOfSubset(0, 1, rem);
  }
  
  void sumOfSubset(int sum, int k, int rem) {
      int i;
  
      x[k] = 1;
      if (sum + a[k] == total) {
          printf("Solution #%d:\t", ++sol_no);
          for (i = 1; i <= k; i++) {
              if (x[i])
                  printf("%d\t", a[i]);
          }
          printf("\n");
      } else if ((sum + a[k] + a[k + 1]) <= total) {
          sumOfSubset(sum + a[k], k + 1, rem - a[k]);
      }
  
      if ((sum + rem - a[k] >= total) && (sum + a[k + 1] <= total)) {
          x[k] = 0;
          sumOfSubset(sum, k + 1, rem - a[k]);
      }
  }`,
        "bfs": `#include <stdio.h>
  int n, i, j, visited[10], queue[10], f = -1, r = -1;
  int adj[10][10];
  void bfs(int v) {
      visited[v] = 1; 
      queue[++r] = v; 
      while (f < r) {
          int current = queue[++f];
          printf("%d ", current); 
          
          for (i = 1; i <= n; i++) {
              if (adj[current][i] && !visited[i]) {
                  visited[i] = 1;
                  queue[++r] = i;
              }
          }
      }
  }
  int main() {
      int v;
      printf("Enter the number of vertices: ");
      scanf("%d", &n);
      for (i = 1; i <= n; i++) {
          visited[i] = 0;
          queue[i] = 0;
      }
      printf("Enter the graph data (adjacency matrix):\n");
      for (i = 1; i <= n; i++) {
          for (j = 1; j <= n; j++) {
              scanf("%d", &adj[i][j]);
          }
      }
      printf("Enter the starting vertex: ");
      scanf("%d", &v);
      printf("The nodes reachable from vertex %d are: \n", v);
      bfs(v);
      return 0;
  }`,
        "kruskal": `#include<stdio.h>
  #include<stdlib.h>
  int i,j,k,u,v,a,b,n,ne=1;
  int min,mincost=0,adj[25][25],parent[25];
  int findp(int i)
  {
   while(parent[i])
    i=parent[i];
   return i;
  }
  int uni(int i,int j)
  {
   if(i!=j)
   {
    parent[j]=i;
    return 1;
   }
   return 0;
  }
  void main()
  {
   printf("Enter the no of vertices:");
   scanf("%d",&n);
   printf("Enter the cost of adjacency matrix are:");
   for(i=1;i<=n;i++)
   {
    for(j=1;j<=n;j++)
    {
     scanf("%d",&adj[i][j]);
     if(adj[i][j]==0)
      adj[i][j]=999;
    }
   }
   printf("The cost of the given matrix are:\n");
   while(ne<n)
   {
    for(i=1,min=999;i<=n;i++)
    {
     for(j=1;j<=n;j++)
     {
      if(adj[i][j]<min)
      {
       min=adj[i][j];
       a=u=i;
       b=v=j;
      }
     }
    }
    u=findp(u);
    v=findp(v);
    if(uni(u,v))
    {
     printf("%d Edge(%d,%d)=%d\n",ne++,a,b,min);
     mincost+=min;
    }
    adj[a][b]=adj[b][a]=999;
   }
   printf("\n\tMincost=%d\n",mincost);
  }`,
        "disk": `#include <stdio.h>
  int dijkstrasAlgorithm(int a[10][10], int n, int source);
  int main() {
      int a[10][10], n, source, i, j;
      printf("Enter the number of nodes: ");
  scanf("%d", &n);
      printf("Enter the Cost Adjacency Matrix:\n");
      for (i = 1; i <= n; i++)
          for (j = 1; j <= n; j++)
  scanf("%d", &a[i][j]);
      printf("Enter the source node: ");
  scanf("%d", &source);
  dijkstrasAlgorithm(a, n, source);
      return 0;
  }
  int dijkstrasAlgorithm(int a[10][10], int n, int source) {
      int d[10], s[10] = {0}, p[10], i, j, min, u, v;
      for (i = 1; i <= n; i++) {
          d[i] = a[source][i];
          p[i] = source;
      }
      s[source] = 1;
      for (i = 1; i <= n; i++) {
          min = 999;
          for (j = 1; j <= n; j++) {
              if (s[j] == 0 && min > d[j]) {
                  min = d[j];
                  u = j;
              }
          }
  
          s[u] = 1;
          for (v = 1; v <= n; v++) {
              if (s[v] == 0 && d[v] > ( d[u] + a[u][v] )) {
                  d[v] = d[u] + a[u][v];
                  p[v] = u;
              }
          }
      }
      printf("Shortest Path from All Vertices are:\n");
      for (i = 1; i <= n; i++) {
          if (d[i] == 0)
              printf("%d <- %d = %d\n", i, source, d[i]);
          else {
              j = i;
              while (j != source) {
                  printf("%d <- ", j);
                  j = p[j];
              }
              printf("%d = %d\n", source, d[i]);
          }
      }
  }`,
        "warshall": `#include<stdio.h>
  int warshallsAlgorithm(int a[10][10], int n);
  int main()
  {
  int a[10][10], i, j ,n;
  printf("enter the number of nodes");
  scanf("%d",&n);
  printf("enter the adjacency matrix");
  for(i=1;i<=n;i++){
  for(j=1;j<=n;j++){
  scanf("%d",&a[i][j]);
  }
  }
  warshallsAlgorithm(a,n);
  printf("The path matrix after applying transitive closure is:\n");
  for(i=1;i<=n;i++){
  for(j=1;j<=n;j++){
  printf("%d",a[i][j]);
  }
  printf("\n");
  }
  return 0;
  }
  int warshallsAlgorithm(int a[10][10], int n){
  int i,j,k;
  for(k=1;k<=n;k++){
  for(i=1;i<=n;i++){
  for(j=1;j<=n;j++){
  a[i][j]=a[i][j]||(a[i][k]&&a[k][j]);
  }
  }
  }
  return 0;
  }`,
  
          "quicksort": `#include<stdio.h>
  int quickSort(int a[],int low,int high);
  int partition(int a[],int low,int high);
  int main()
  {
  int a[1000],n,i;
  printf("enter the number of elements:");
  scanf("%d",&n);
  printf("entering random values into array:\n");
  for(i=1;i<=n;i++)
  {
  a[i]=rand()%100;
  printf("%d ",a[i]);
  }
  quickSort(a,1,n);
  printf("\nsorted elements are:\n");
  for(i=1;i<=n;i++)
  printf("%d ",a[i]);
  return 0;
  }
  int quickSort(int a[],int low,int high)
  {
  int j;
  if(low<high){
  j=partition(a,low,high);
  quickSort(a,low,j-1);
  quickSort(a,j+1,high);
  }
  return 0;
  }
  int partition(int a[],int low,int high)
  {
  int key=a[low],i=low+1,j=high,temp;
  for(;;)
  {
  while(key>=a[i]&&i<high)
  i++;
  while(key<a[j])
  j--;
  if(i<j)
  {
  temp=a[i];
  a[i]=a[j];
  a[j]=temp;
  }
  else
  {
  temp=a[low];
  a[low]=a[j];
  a[j]=temp;
  return j;
  }
  }
  }`,
              "knapsack": `#include <stdio.h>
  
  // Function to find maximum of two integers
  int max(int a, int b) {
      return (a > b) ? a : b;
  }
  
  // Knapsack function using DP
  int knapsack(int weights[], int values[], int n, int capacity) {
      int dp[n + 1][capacity + 1];
  
      // Build dp table
      for (int i = 0; i <= n; i++) {
          for (int w = 0; w <= capacity; w++) {
              if (i == 0 || w == 0)
                  dp[i][w] = 0;
              else if (weights[i - 1] <= w)
                  dp[i][w] = max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
              else
                  dp[i][w] = dp[i - 1][w];
          }
      }
  
      return dp[n][capacity];
  }
  
  // Main function
  int main() {
      int n, capacity;
  
      // Input number of items
      printf("Enter number of items: ");
      scanf("%d", &n);
  
      int weights[n], values[n];
  
      // Input weights
      printf("Enter weights of items:\n");
      for (int i = 0; i < n; i++) {
          printf("Weight of item %d: ", i + 1);
          scanf("%d", &weights[i]);
      }
  
      // Input values
      printf("Enter values of items:\n");
      for (int i = 0; i < n; i++) {
          printf("Value of item %d: ", i + 1);
          scanf("%d", &values[i]);
      }
  
      // Input capacity
      printf("Enter knapsack capacity: ");
      scanf("%d", &capacity);
  
      // Call knapsack function
      int result = knapsack(weights, values, n, capacity);
      printf("Maximum value that can be placed in the knapsack: %d\n", result);
  
      return 0;
  }
  `,
      "merge(no random)": `#include <stdio.h>
  
  void merge(int arr[], int l, int m, int r) {
      int n1 = m - l + 1;
      int n2 = r - m;
  
      int L[n1], R[n2];
      for (int i = 0; i < n1; i++)
          L[i] = arr[l + i];
      for (int j = 0; j < n2; j++)
          R[j] = arr[m + 1 + j];
  
      int i = 0, j = 0, k = l;
      while (i < n1 && j < n2) {
          if (L[i] <= R[j])
              arr[k++] = L[i++];
          else
              arr[k++] = R[j++];
      }
  
      while (i < n1)
          arr[k++] = L[i++];
      while (j < n2)
          arr[k++] = R[j++];
  }
  
  void mergeSort(int arr[], int l, int r) {
      if (l < r) {
          int m = l + (r - l) / 2;
          mergeSort(arr, l, m);
          mergeSort(arr, m + 1, r);
          merge(arr, l, m, r);
      }
  }
  
  int main() {
      int n;
      printf("Enter number of elements: ");
      scanf("%d", &n);
  
      int arr[n];
      printf("Enter %d elements:\n", n);
      for (int i = 0; i < n; i++)
          scanf("%d", &arr[i]);
  
      mergeSort(arr, 0, n - 1);
  
      printf("Sorted array:\n");
      for (int i = 0; i < n; i++)
          printf("%d ", arr[i]);
  
      return 0;
  }`,
          "merge(random)": `#include <stdio.h>
  #include <stdlib.h>
  #include <time.h>
  
  void merge(int arr[], int l, int m, int r) {
      int n1 = m - l + 1;
      int n2 = r - m;
      int L[n1], R[n2];
  
      for (int i = 0; i < n1; i++)
          L[i] = arr[l + i];
      for (int j = 0; j < n2; j++)
          R[j] = arr[m + 1 + j];
  
      int i = 0, j = 0, k = l;
      while (i < n1 && j < n2) {
          if (L[i] <= R[j])
              arr[k++] = L[i++];
          else
              arr[k++] = R[j++];
      }
  
      while (i < n1)
          arr[k++] = L[i++];
      while (j < n2)
          arr[k++] = R[j++];
  }
  
  void mergeSort(int arr[], int l, int r) {
      if (l < r) {
          int m = l + (r - l) / 2;
          mergeSort(arr, l, m);
          mergeSort(arr, m + 1, r);
          merge(arr, l, m, r);
      }
  }
  
  int main() {
      int n;
      printf("Enter number of elements: ");
      scanf("%d", &n);
  
      int arr[n];
      srand(time(NULL));
      printf("Randomly generated array:\n");
      for (int i = 0; i < n; i++) {
          arr[i] = rand() % 100;
          printf("%d ", arr[i]);
      }
  
      mergeSort(arr, 0, n - 1);
  
      printf("\nSorted array:\n");
      for (int i = 0; i < n; i++)
          printf("%d ", arr[i]);
  
      return 0;
  }`,
      "prims": `#include<stdio.h>
  
  int main() {
      int n, a[10][10], vis[10] = {0}, ne = 0, u, v, min, u0, v0;
      printf("Enter the number of nodes: ");
      scanf("%d", &n);
      printf("Enter the adjacency matrix:\n");
      for (int i = 1; i <= n; i++) {
          for (int j = 1; j <= n; j++) {
              scanf("%d", &a[i][j]);
          }
      }
  
      vis[1] = 1;
      while (ne < n - 1) {
          min = 1e9;
          for (int i = 1; i <= n; i++) {
              if (vis[i]) {
                  for (int j = 1; j <= n; j++) {
                      if (!vis[j] && a[i][j] < min) {
                          min = a[i][j];
                          u0 = i;
                          v0 = j;
                      }
                  }
              }
          }
          printf("Edge: %d-%d with weight %d\n", u0, v0, min);
          vis[v0] = 1;
          ne++;
      }
      return 0;
  }`,
};
document.getElementById('search').addEventListener('input', function() {
  const val = this.value.trim();
  const code = programs[val] || "Program not found!";
  document.getElementById('codeArea').value = code;
});
function copyToClipboard() {
  const textArea = document.getElementById('codeArea');
  textArea.select();
  document.execCommand('copy');
  alert("Copied to clipboard!");
}