import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Layout>
        <div className="container">
          <h1>
            Welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Manage Blood Bank App</h3>
          <hr />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum,
            iusto. Omnis aliquid velit numquam obcaecati, laudantium harum?
            Consequatur sint itaque ipsum ipsam sit deleniti esse pariatur modi
            veritatis nulla necessitatibus voluptas rem reiciendis nemo, impedit
            assumenda animi quaerat cum voluptates hic id est in aperiam
            architecto. Ut dolore itaque ad, sapiente nesciunt earum iste
            tempora molestias ipsum expedita dicta ipsam cupiditate? Veritatis
            nobis ratione fuga eius, velit quos beatae in. Non consequuntur rem
            debitis. Laudantium ducimus consectetur vitae omnis in adipisci
            consequuntur cumque. Maiores similique, nostrum ut fugiat est
            dolorum eum aperiam tempora veniam possimus consectetur laboriosam
            maxime totam. Nulla earum incidunt eum alias quod similique culpa
            repudiandae ipsam aspernatur accusantium at facilis ullam quo,
            voluptate est tempora magnam laboriosam natus minus! Sit nisi totam
            obcaecati, maxime minima est voluptatibus eius, alias quisquam non,
            corrupti ducimus! Placeat pariatur odit quidem. Dolorum vel delectus
            ut! Eos facere reiciendis dolore magni ab praesentium iusto
            dignissimos iure, non odit similique veniam autem quam sed assumenda
            architecto qui? Ex atque ipsam unde ipsum reprehenderit totam
            obcaecati, ratione consequuntur quae eum adipisci. Ad debitis ut
            perspiciatis necessitatibus, minima id non animi impedit sunt qui
            nihil accusamus molestias voluptates veritatis. Possimus enim soluta
            esse recusandae a!
          </p>
        </div>
      </Layout>
    </>
  );
};

export default AdminHome;
