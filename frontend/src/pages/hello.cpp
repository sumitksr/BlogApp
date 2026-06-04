// =============================================
//          @sumitksr
// =============================================

#include <bits/stdc++.h>
using namespace std;

// ---------- Aliases ----------
#define P pair<int,int>      
typedef long long ll;
typedef vector<int> vi;
typedef vector<ll> vll;
typedef pair<ll,ll> pll;

// ---------- Fast IO ----------
#define fastio ios::sync_with_stdio(false); cin.tie(nullptr);

// ---------- Constants ----------
const int INF = 1e9;
const ll LINF = 1e18;
const int MOD = 1e9 + 7;

// ---------- Data Structure Aliases ----------
#define pq priority_queue<int>                                            // Max heap
#define pqm priority_queue<int, vector<int>, greater<int>>                // Min heap
#define hash unordered_map<int,int>                                       // Hash map
#define HashSet unordered_set<int>                                        // Hash set

// ---------- Common Macros ----------
#define all(x) (x).begin(), (x).end()
#define rall(x) (x).rbegin(), (x).rend()
#define sz(x) ((int)(x).size())
#define rep(i, a, b) for (int i = (a); i < (b); ++i)
#define rrep(i, a, b) for (int i = (a); i >= (b); --i)
#define yes cout << "YES\n"
#define no cout << "NO\n"

// ---------- Custom Comparator for PQ ----------
struct cmp {
    bool operator()(const P &a, const P &b) const {
        return a.second > b.second; // min-heap based on second element
    }
};

// ---------- Helper Functions ----------
ll mod_add(ll a, ll b) { a %= MOD; b %= MOD; return (a + b + MOD) % MOD; }
ll mod_mul(ll a, ll b) { a %= MOD; b %= MOD; return (a * b) % MOD; }
ll mod_pow(ll a, ll b) {
    ll res = 1;
    while (b) {
        if (b & 1) res = (res * a) % MOD;
        a = (a * a) % MOD;
        b >>= 1;
    }
    return res;
}

// ---------- Output Array Helper ----------
template <typename T>
void printArr(const vector<T> &v, string sep = " ") {
    for (int i = 0; i < (int)v.size(); ++i) {
        cout << v[i];
        if (i + 1 < (int)v.size()) cout << sep;
    }
    cout << "\n";
}

// ---------- Main ----------
int main() {
    fastio;
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin>>n;
        vi arr(n);
        for(int i =0;i<n;i++){
            cin>>arr[i];
        }
        HashSet s; 
        s.reserve(1024);
        int ans = 0;
        for (int x : arr) {
            if (x == 1 || s.find(x - 1) != s.end()) {
                ++ans;
                s.insert(x);
            }
        }
        cout << ans << '\n';
        
    }
    return 0;
}

// ----- How to call -----
//  sort(all(v));
//     printArr(v);

// ? Print an array/vector
// vi arr = {5, 3, 8};
// printArr(arr);               // prints: 5 3 8
// printArr(arr, ", ");         // prints: 5, 3, 8

// ? Max Heap
// pq mx; mx.push(10); mx.push(5);
// cout << mx.top() << "\n";

// ? Min Heap
// pqm mn; mn.push(10); mn.push(5);
// cout << mn.top() << "\n";

// ? Hash Map
// hash freq; freq[10]++; freq[20] += 2;
// for (auto &p : freq) cout << p.first << " -> " << p.second << "\n";

// ? Hash Set
// HashSet s; s.insert(10); s.insert(20);
// if (s.count(10)) cout << "10 is present\n";

// ? Pair Example
// P p = {1, 2};
// cout << "Pair: " << p.first << "," << p.second << "\n";
