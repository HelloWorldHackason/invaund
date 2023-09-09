import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import fireStore from '../../firebase';

const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<firebase.firestore.DocumentData[]>([]);

  useEffect(() => {
    const searchUsers = async() => {
      // Firestoreのコレクションを指定してデータ取得。今回は全量を検索
      const res = await fireStore.collection('users').get();
      if (res.empty) return [];
      const userList: firebase.firestore.DocumentData[] = [];
      // DocumentData型にはmapメソッドが定義されていないため、forEachのループでデータを加工
      res.forEach(doc => {
          userList.push(doc.data());
      })
      setUsers(userList);
    }

    searchUsers();
    setLoading(false);
}, []);