import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormLabel } from 'react-bootstrap';

const RoleManageForm = () => {
  const handleUpdate = (e) => {
    e.preventDefault();
    alert('권한이 업데이트 되었습니다.');
  };

  return (
    <>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formSearch">
          <FormLabel column sm={2}>
            검색
          </FormLabel>
          <Col sm>
            <Form.Control type="text" placeholder="검색할 이름을 입력하세요" />
          </Col>
        </Form.Group>
      </Form>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formName">
          <FormLabel column sm={2}>
            이름
          </FormLabel>
          <FormLabel column sm={10}>
            아직 검색되지 않았습니다
          </FormLabel>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formMail">
          <FormLabel column sm={2}>
            email
          </FormLabel>
          <FormLabel column sm={10}>
            아직 검색되지 않았습니다
          </FormLabel>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3 inlineChecks"
          controlId="formCheck"
        >
          <Form.Label as="legend" column sm={2}>
            권한
          </Form.Label>
          <Col sm={4}>
            <Form.Check
              inline
              className="inlineChecks"
              type="radio"
              label="일반 유저"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
            />
          </Col>
          <Col sm={4}>
            <Form.Check
              inline
              className="inlineChecks"
              type="radio"
              label="관리자"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
            />
          </Col>
        </Form.Group>
        <div className="centerAlign">
          <Button type="submit" onClick={handleUpdate}>
            업데이트
          </Button>
        </div>
      </Form>
    </>
  );
};

export default RoleManageForm;
